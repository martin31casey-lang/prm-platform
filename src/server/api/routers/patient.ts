import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const patientRouter = createTRPCRouter({
  // Obtener estado de onboarding y datos actuales
  getOnboardingStatus: protectedProcedure.query(async ({ ctx }) => {
    // BYPASS PARA SIMULACIÓN (Demos sin dependencia de BD)
    if (ctx.session.user.id === "test-user-id") {
      return {
        id: "mock-patient-id",
        userId: "test-user-id",
        dni: "12345678",
        onboardingCompleted: true, // Forzamos true para ver el dashboard directo
        insuranceProviderId: null,
        insurancePlanId: null,
        membershipNumber: "SM-1234567-01",
        insurance: null,
        plan: null
      };
    }

    try {
        let patient = await ctx.db.patient.findUnique({
          where: { userId: ctx.session.user.id },
          include: { insurance: true, plan: true }
        });

        if (!patient) {
          patient = await ctx.db.patient.create({
            data: { userId: ctx.session.user.id, onboardingCompleted: false },
            include: { insurance: true, plan: true }
          });
        }
        return patient;
    } catch (e) {
        console.error("Error en getOnboardingStatus:", e);
        throw new Error("No se pudo obtener el perfil del paciente");
    }
  }),

  // Listar Obras Sociales para el buscador
  getInsuranceProviders: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.insuranceProvider.findMany({
      include: { plans: true },
      orderBy: { name: "asc" }
    });
  }),

  // Actualizar perfil (Finalizar Onboarding)
  updateProfile: protectedProcedure
    .input(z.object({
      dni: z.string().min(7),
      address: z.string().min(5),
      city: z.string().min(3),
      postalCode: z.string().min(4),
      insuranceProviderId: z.string(),
      insurancePlanId: z.string(),
      membershipNumber: z.string().min(5),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.patient.update({
        where: { userId: ctx.session.user.id },
        data: {
          ...input,
          onboardingCompleted: true
        }
      });
    }),

  // Simulación de validación de token / credencial
  validateInsurance: protectedProcedure
    .input(z.object({
      providerId: z.string(),
      membershipNumber: z.string()
    }))
    .mutation(async ({ input }) => {
      // Simulamos un delay de red y una validación lógica
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isValid = input.membershipNumber.length > 5;
      
      if (!isValid) {
          throw new Error("Credencial no válida o plan inactivo");
      }

      return {
        status: "VALIDATED",
        token: `AUTH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60) // 1 hora de validez
      };
    }),

  // Obtener centros frecuentes o favoritos
  getFrequentCenters: protectedProcedure.query(async ({ ctx }) => {
    const patient = await ctx.db.patient.findUnique({
      where: { userId: ctx.session.user.id },
      include: {
        favoriteCenters: {
          include: { center: true },
          orderBy: [
            { isFavorite: "desc" },
            { visitCount: "desc" }
          ],
          take: 3
        }
      }
    });

    if (!patient || patient.favoriteCenters.length === 0) {
      // Si no tiene favoritos, devolvemos los centros generales por ahora (simulado)
      return [];
    }

    return patient.favoriteCenters.map(fc => ({
      ...fc.center,
      isFavorite: fc.isFavorite,
      visitCount: fc.visitCount
    }));
  }),

  // Marcar un centro como favorito
  toggleFavoriteCenter: protectedProcedure
    .input(z.object({ centerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const patient = await ctx.db.patient.findUnique({
        where: { userId: ctx.session.user.id }
      });

      if (!patient) throw new Error("Paciente no encontrado");

      const existing = await ctx.db.favoriteCenter.findUnique({
        where: {
          patientId_centerId: {
            patientId: patient.id,
            centerId: input.centerId
          }
        }
      });

      if (existing) {
        return await ctx.db.favoriteCenter.update({
          where: {
            patientId_centerId: {
              patientId: patient.id,
              centerId: input.centerId
            }
          },
          data: { isFavorite: !existing.isFavorite }
        });
      } else {
        return await ctx.db.favoriteCenter.create({
          data: {
            patientId: patient.id,
            centerId: input.centerId,
            isFavorite: true
          }
        });
      }
    }),

  // Obtener perfil completo para la sección Mi Cuenta
  getFullProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.patient.findUnique({
      where: { userId: ctx.session.user.id },
      include: { 
        user: {
            select: { name: true, email: true, image: true }
        },
        insurance: true, 
        plan: true 
      }
    });
  }),

  // Actualización de datos desde Mi Cuenta
  updateFullProfile: protectedProcedure
    .input(z.object({
      name: z.string().min(2),
      phoneNumber: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      postalCode: z.string().optional(),
      insuranceProviderId: z.string().optional(),
      insurancePlanId: z.string().optional(),
      membershipNumber: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { name, ...patientData } = input;
      
      // Actualizar nombre en User
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { name }
      });

      // Actualizar datos en Patient
      return await ctx.db.patient.update({
        where: { userId: ctx.session.user.id },
        data: patientData
      });
    }),
});
