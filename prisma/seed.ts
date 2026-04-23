import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const providers = [
    {
      name: "OSDE",
      code: "OSDE001",
      plans: ["210", "310", "410", "450", "510"],
    },
    {
      name: "Swiss Medical",
      code: "SM002",
      plans: ["Classic", "Superior", "Directo", "Oro"],
    },
    {
      name: "Galeno",
      code: "GAL003",
      plans: ["Plata", "Oro", "Azul"],
    },
    {
      name: "Medicus",
      code: "MED004",
      plans: ["Celeste", "Azul", "Blanco"],
    },
    {
      name: "OMINT",
      code: "OMT005",
      plans: ["O", "F", "S", "SK"],
    },
  ];

  console.log("Seeding Insurance Providers...");

  for (const p of providers) {
    const provider = await prisma.insuranceProvider.upsert({
      where: { name: p.name },
      update: {},
      create: {
        name: p.name,
        code: p.code,
      },
    });

    for (const planName of p.plans) {
      await prisma.insurancePlan.upsert({
        where: { 
            // Composite unique constraint would be better, but for simulation:
            id: `${provider.id}-${planName}` 
        },
        update: {},
        create: {
          id: `${provider.id}-${planName}`,
          name: planName,
          insuranceProviderId: provider.id,
        },
      });
    }
  }

  const centers = [
    {
      id: "sede-central",
      name: "Sede Central",
      address: "Av. Libertador 4450, CABA",
      phone: "+54 11 4455-6600",
      type: "Alta Complejidad",
      guardTime: "15 min",
      status: "normal",
      image: "/images/sede-central.png",
      link: "https://goo.gl/maps/example1"
    },
    {
      id: "sede-belgrano",
      name: "Centro Médico Belgrano",
      address: "Cabildo 1800, Belgrano",
      phone: "+54 11 4800-9900",
      type: "Consultorios Externos",
      guardTime: "45 min",
      status: "busy",
      image: "/images/sede-belgrano.png",
      link: "https://goo.gl/maps/example2"
    },
    {
      id: "sede-pilar",
      name: "Sanatorio Pilar Campus",
      address: "Km 50 Panamericana, Pilar",
      phone: "+54 0230 448-7700",
      type: "Internación y Guardia",
      guardTime: "5 min",
      status: "normal",
      image: "/images/sede-pilar.png",
      link: "https://goo.gl/maps/example3"
    }
  ];

  console.log("Seeding Medical Centers...");

  for (const c of centers) {
    await prisma.medicalCenter.upsert({
      where: { id: c.id },
      update: { ...c },
      create: { ...c },
    });
  }

  console.log("Seed finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
