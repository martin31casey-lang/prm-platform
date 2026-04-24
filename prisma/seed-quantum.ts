import { PrismaClient, NewsStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando Seed Multi-tenant para Quantum...");

  // 1. Crear la Institución Quantum
  const quantum = await prisma.institution.upsert({
    where: { slug: "quantum" },
    update: {},
    create: {
      name: "Quantum Medical Group",
      slug: "quantum",
      primaryColor: "#4f46e5", // Indigo
      secondaryColor: "#0f172a", // Slate
      welcomeMessage: "Bienvenido al Portal de Autogestión de Quantum",
    },
  });

  console.log(`✅ Institución Quantum creada/verificada: ${quantum.id}`);

  // 2. Crear Noticias de ejemplo en la nueva tabla
  await prisma.news.deleteMany({ where: { institutionId: quantum.id } });
  
  await prisma.news.createMany({
    data: [
      { 
        institutionId: quantum.id,
        title: "Nueva Sede Palermo", 
        content: "Ya puede atenderse en nuestra nueva sede con tecnología de punta.", 
        status: NewsStatus.ACTIVE 
      },
      { 
        institutionId: quantum.id,
        title: "Telemedicina 24hs", 
        content: "Recuerde que nuestra guardia virtual está activa todo el día.", 
        status: NewsStatus.ACTIVE 
      }
    ]
  });

  console.log("✅ Noticias de ejemplo creadas.");

  // 3. Vincular Centros Médicos existentes a Quantum (si los hay)
  const updatedCenters = await prisma.medicalCenter.updateMany({
    where: { institutionId: null },
    data: { institutionId: quantum.id },
  });

  console.log(`✅ ${updatedCenters.count} sedes vinculadas a Quantum.`);

  // 4. Crear Usuario Médico de Prueba (Test / 1234)
  const testDoctor = await prisma.user.upsert({
    where: { username: "Test" },
    update: {},
    create: {
      username: "Test",
      password: "1234", // En una app real usaríamos hash, pero para esta demo usamos texto plano para coincidir con el config
      name: "Dr. Test Quantum",
      role: "DOCTOR",
      institutionId: quantum.id,
    },
  });

  console.log(`✅ Usuario médico creado: ${testDoctor.username}`);

  // 5. Crear Usuario Paciente de Prueba (Paciente / 1234)
  const testPatient = await prisma.user.upsert({
    where: { username: "Paciente" },
    update: {},
    create: {
      username: "Paciente",
      password: "1234",
      name: "Paciente de Prueba",
      role: "PATIENT",
      institutionId: quantum.id,
    },
  });

  console.log(`✅ Usuario paciente creado: ${testPatient.username}`);

  console.log("✨ Seed completado con éxito.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
