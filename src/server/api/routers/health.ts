import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { MockHISAdapter } from "~/server/services/his/mock-adapter";
import { db } from "~/server/db";

// Instanciamos el adaptador universal (Mock por ahora)
const hisService = new MockHISAdapter();

export const healthRouter = createTRPCRouter({
  // Obtener resumen para el Dashboard
  getDashboardSummary: publicProcedure.query(async () => {
    // En una app real, aquí usaríamos el ID del usuario autenticado
    const patientId = "patient_123";
    
    const [appointments, studies] = await Promise.all([
      hisService.getPatientAppointments(patientId),
      hisService.getPatientStudies(patientId),
    ]);

    return {
      nextAppointment: appointments[0] ?? null,
      recentStudiesCount: studies.length,
      latestStudy: studies[0] ?? null,
      appointmentsCount: appointments.length
    };
  }),

  // Obtener todos los estudios detallados con filtros
  getMedicalHistory: publicProcedure
    .input(z.object({
      type: z.enum(['LAB', 'IMG']).optional(),
      days: z.number().optional()
    }).optional())
    .query(async ({ input }) => {
      const patientId = "patient_123";
      return await hisService.getPatientStudies(patientId, input);
    }),

  // Obtener todos los turnos
  getAppointments: publicProcedure.query(async () => {
    const patientId = "patient_123";
    return await hisService.getPatientAppointments(patientId);
  }),

  // --- TELEMEDICINA ---
  joinQueue: protectedProcedure
    .input(z.object({ specialty: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userEmail = ctx.session.user.email;
      if (!userEmail) throw new Error("No hay email en la sesión");
      
      console.log("MUTATION: joinQueue para email:", userEmail);

      // 1. Buscar o crear usuario por EMAIL
      const user = await db.user.upsert({
        where: { email: userEmail },
        update: {},
        create: {
            email: userEmail,
            name: ctx.session.user.name || "Usuario de Test"
        }
      });

      // 2. Vincular paciente
      const patient = await db.patient.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id, onboardingCompleted: true }
      });

      console.log("Paciente vinculado:", patient.id);

      // Cancelar WAITING previos
      await db.telemedicineCall.updateMany({
        where: { patientId: patient.id, status: "WAITING" },
        data: { status: "CANCELLED" },
      });

      // Crear nueva llamada
      return db.telemedicineCall.create({
        data: {
          patientId: patient.id,
          specialty: input.specialty,
          status: "WAITING",
        },
      });
    }),

  getActiveCall: protectedProcedure.query(async ({ ctx }) => {
    const userEmail = ctx.session?.user?.email;
    if (!userEmail) return null;

    try {
      const user = await db.user.findUnique({
          where: { email: userEmail },
          include: { patient: true }
      });
      
      if (!user?.patient) return null;

      return db.telemedicineCall.findFirst({
        where: { 
          patientId: user.patient.id, 
          status: { in: ["WAITING", "IN_PROGRESS", "COMPLETED"] } 
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      console.error("Error in getActiveCall:", error);
      return null;
    }
  }),

  // Médico: Ver pacientes en espera
  getWaitingQueue: publicProcedure.query(async () => {
    return db.telemedicineCall.findMany({
      where: { status: "WAITING" },
      include: { patient: { include: { user: true } } },
      orderBy: { createdAt: "asc" },
    });
  }),

  // Médico: Ver si tengo una llamada activa para reconectar
  getDoctorActiveCall: publicProcedure
    .input(z.object({ doctorName: z.string() }))
    .query(async ({ input }) => {
      return db.telemedicineCall.findFirst({
        where: { 
            doctorId: input.doctorName, 
            status: "IN_PROGRESS" 
        },
        include: { patient: { include: { user: true } } },
        orderBy: { updatedAt: "desc" },
      });
    }),

  // Médico: Aceptar un paciente
  acceptCall: publicProcedure
    .input(z.object({ callId: z.string(), doctorName: z.string() }))
    .mutation(async ({ input }) => {
      const roomName = `quantum-call-${input.callId.slice(-6)}`;
      return db.telemedicineCall.update({
        where: { id: input.callId },
        data: {
          status: "IN_PROGRESS",
          doctorId: input.doctorName,
          roomName,
          startTime: new Date(),
        },
        include: { patient: { include: { user: true } } },
      });
    }),

  // Finalizar llamada
  endCall: publicProcedure
    .input(z.object({ callId: z.string() }))
    .mutation(async ({ input }) => {
      return db.telemedicineCall.update({
        where: { id: input.callId },
        data: {
          status: "COMPLETED",
          endTime: new Date(),
        },
      });
    }),

  // Guardar encuesta de satisfacción
  submitSurvey: publicProcedure
    .input(z.object({
      callId: z.string(),
      patientId: z.string(),
      attentionRating: z.string(),
      connectionRating: z.string(),
      videoRating: z.string(),
      audioRating: z.string(),
      comment: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return db.telemedicineSurvey.create({
        data: {
          callId: input.callId,
          patientId: input.patientId,
          attentionRating: input.attentionRating,
          connectionRating: input.connectionRating,
          videoRating: input.videoRating,
          audioRating: input.audioRating,
          comment: input.comment,
        }
      });
    }),
});
