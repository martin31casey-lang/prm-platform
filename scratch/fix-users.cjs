const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixTestUser() {
  try {
    // Buscar el usuario (probablemente el único o el último logueado)
    const users = await prisma.user.findMany({
      orderBy: { id: 'desc' },
      take: 5
    });
    
    console.log("Usuarios encontrados:", users.map(u => ({ id: u.id, email: u.email })));

    for (const user of users) {
      const patient = await prisma.patient.findUnique({
        where: { userId: user.id }
      });

      if (!patient) {
        console.log(`Creando paciente para usuario: ${user.email || user.id}`);
        await prisma.patient.create({
          data: {
            userId: user.id,
            onboardingCompleted: true,
            dni: "TEST-" + Math.floor(Math.random() * 1000000), // Evitar duplicados
          }
        });
      } else {
        console.log(`Usuario ${user.email || user.id} ya tiene paciente.`);
      }
    }
  } catch (error) {
    console.error("Error al reparar:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fixTestUser();
