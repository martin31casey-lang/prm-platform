const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkModels() {
  console.log("Modelos disponibles en prisma.db:");
  const models = Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$'));
  console.log(models);
  process.exit(0);
}

checkModels();
