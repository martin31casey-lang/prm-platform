import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const telemedicineRouter = createTRPCRouter({
  // Paciente: Unirse a la fila de espera
  joinQueue: protectedProcedure
    .input(z.object({ specialty: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("--- INICIO MUTATION joinQueue ---");
      console.log("User Session Email:", ctx.session.user.email);
      console.log("User Session ID:", ctx.session.user.id);
      
      let patient;

      try {
        // Buscamos o creamos el paciente en una sola operación atómica
        patient = await ctx.db.patient.upsert({
            where: { userId: ctx.session.user.id },
            update: {}, // Si existe, no cambiamos nada
            create: {
                userId: ctx.session.user.id,
                onboardingCompleted: true
            }
        });
        console.log("Paciente obtenido/creado:", patient.id);
      } catch (err: any) {
        console.error("Error en UPSERT de paciente:", err);
        // Segundo intento: Buscar por email como fallback absoluto
        const user = await ctx.db.user.findUnique({ 
            where: { email: ctx.session.user.email! },
            include: { patient: true }
        });
        patient = user?.patient;
        if (!patient) throw new Error("No se pudo determinar el perfil de paciente.");
      }

      console.log("Procediendo a crear la llamada para paciente:", patient.id);

      // Cancelar previas
      await ctx.db.telemedicineCall.updateMany({
        where: { patientId: patient.id, status: "WAITING" },
        data: { status: "CANCELLED" },
      });

      // Crear la nueva llamada
      const newCall = await ctx.db.telemedicineCall.create({
        data: {
          patientId: patient.id,
          specialty: input.specialty,
          status: "WAITING",
        },
      });

      console.log("Llamada creada con éxito:", newCall.id);
      return newCall;
    }),

  // Paciente: Consultar si su llamada fue aceptada
  getActiveCall: protectedProcedure.query(async ({ ctx }) => {
    const patient = await ctx.db.patient.findUnique({
      where: { userId: ctx.session.user.id },
    });

    if (!patient) return null;

    return ctx.db.telemedicineCall.findFirst({
      where: { 
        patientId: patient.id, 
        status: { in: ["WAITING", "IN_PROGRESS"] } 
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Médico: Ver pacientes en espera
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

  // Médico: Aceptar un paciente
  acceptCall: publicProcedure
    .input(z.object({ callId: z.string(), doctorName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const roomName = `quantum-call-${input.callId.slice(-6)}`;
      
      return ctx.db.telemedicineCall.update({
        where: { id: input.callId },
        data: {
          status: "IN_PROGRESS",
          doctorId: input.doctorName, // Simulamos con el nombre
          roomName,
          startTime: new Date(),
        },
      });
    }),

  // Finalizar llamada
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
});
