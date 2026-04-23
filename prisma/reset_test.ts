import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function reset() {
  console.log("Reseteando paciente de prueba...");
  try {
    await prisma.patient.deleteMany({
      where: {
        user: {
          email: "test@prm.com",
        },
      },
    });
    console.log("¡Éxito! Perfil eliminado. El sistema pedirá los datos en el próximo ingreso.");
  } catch (e) {
    console.error("Error al resetear:", e);
  } finally {
    await prisma.$disconnect();
  }
}

reset();
