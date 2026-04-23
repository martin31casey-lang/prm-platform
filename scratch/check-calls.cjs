const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCalls() {
  try {
    const calls = await prisma.telemedicineCall.findMany({
      include: { patient: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    console.log(JSON.stringify(calls, null, 2));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCalls();
