import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const telemedicineRouter = createTRPCRouter({
  // Paciente: Unirse a la fila de espera (Usando ID de sesión que es infalible)
  joinQueue: protectedProcedure
    .input(z.object({ specialty: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("--- INICIO MUTATION joinQueue ---");
      const userId = ctx.session.user.id;
      
      // 1. Aseguramos perfil de paciente vinculado al usuario
      const patient = await ctx.db.patient.upsert({
        where: { userId: userId },
        update: {},
        create: {
            userId: userId,
            onboardingCompleted: true
        }
      });

      console.log("Paciente ID:", patient.id);

      // 2. Cancelamos cualquier llamada WAITING previa de este paciente para evitar duplicados
      await ctx.db.telemedicineCall.updateMany({
        where: { patientId: patient.id, status: "WAITING" },
        data: { status: "CANCELLED" },
      });

      // 3. Creamos la nueva llamada REAL en la base de datos
      const newCall = await ctx.db.telemedicineCall.create({
        data: {
          patientId: patient.id,
          specialty: input.specialty,
          status: "WAITING",
        },
        include: {
            patient: {
                include: { user: true }
            }
        }
      });

      console.log("Llamada WAITING creada con ID:", newCall.id);
      return newCall;
    }),

  // Paciente: Consultar estado de su llamada
  getActiveCall: protectedProcedure.query(async ({ ctx }) => {
    const patient = await ctx.db.patient.findUnique({
      where: { userId: ctx.session.user.id },
    });

    if (!patient) return null;

    return ctx.db.telemedicineCall.findFirst({
      where: { 
        patientId: patient.id, 
        status: { in: ["WAITING", "IN_PROGRESS", "COMPLETED"] } 
      },
      include: {
          patient: { include: { user: true } }
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Médico: Ver fila de espera en tiempo real
  getWaitingQueue: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.telemedicineCall.findMany({
      where: { status: "WAITING" },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  }),

  // Médico: Reconexión de llamada activa
  getDoctorActiveCall: publicProcedure
    .input(z.object({ doctorName: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.telemedicineCall.findFirst({
        where: { 
            doctorId: input.doctorName, 
            status: "IN_PROGRESS" 
        },
        include: { patient: { include: { user: true } } },
        orderBy: { updatedAt: "desc" },
      });
    }),

  // Médico: Aceptar paciente
  acceptCall: publicProcedure
    .input(z.object({ callId: z.string(), doctorName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const roomName = `quantum-call-${input.callId.slice(-6)}`;
      
      return ctx.db.telemedicineCall.update({
        where: { id: input.callId },
        data: {
          status: "IN_PROGRESS",
          doctorId: input.doctorName,
          roomName,
          startTime: new Date(),
        },
        include: {
            patient: { include: { user: true } }
        }
      });
    }),

  // Finalizar atención
  endCall: publicProcedure
    .input(z.object({ callId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.telemedicineCall.update({
        where: { id: input.callId },
        data: {
          status: "COMPLETED",
          endTime: new Date(),
        },
      });
    }),

  // Paciente: Guardar encuesta
  submitSurvey: protectedProcedure
    .input(z.object({
      callId: z.string(),
      attentionRating: z.string(),
      connectionRating: z.string(),
      videoRating: z.string(),
      audioRating: z.string(),
      comment: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const patient = await ctx.db.patient.findUnique({
          where: { userId: ctx.session.user.id }
      });
      if (!patient) throw new Error("No se encontró el perfil de paciente.");

      return ctx.db.telemedicineSurvey.create({
        data: {
          callId: input.callId,
          patientId: patient.id,
          attentionRating: input.attentionRating,
          connectionRating: input.connectionRating,
          videoRating: input.videoRating,
          audioRating: input.audioRating,
          comment: input.comment,
        }
      });
    }),
});
