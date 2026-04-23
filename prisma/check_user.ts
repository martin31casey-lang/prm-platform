import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  const user = await prisma.user.findUnique({
    where: { email: "test@prm.com" },
    include: { patient: true }
  });
  console.log(JSON.stringify(user, null, 2));
  await prisma.$disconnect();
}

check();
