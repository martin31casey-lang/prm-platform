import { NextResponse } from "next/server";
import { db } from "~/server/db";

/**
 * ENDPOINT DE INTEGRACIÓN HIS
 * Permite que el sistema HIS externo envíe los datos de sus profesionales
 * para que se den de alta automáticamente en el PRM.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
        firstName, 
        lastName, 
        licenseNumber, 
        specialty, 
        phone, 
        address, 
        username, 
        password,
        institutionId 
    } = body;

    // Validación básica
    if (!username || !password || !licenseNumber) {
      return NextResponse.json({ error: "Faltan campos obligatorios (username, password, licenseNumber)" }, { status: 400 });
    }

    // 1. Upsert del Usuario (por username)
    const user = await db.user.upsert({
      where: { username },
      update: {
        name: `${firstName} ${lastName}`,
        password: password, // En prod usar hash
        role: "DOCTOR",
        institutionId: institutionId || null,
      },
      create: {
        username,
        password,
        name: `${firstName} ${lastName}`,
        role: "DOCTOR",
        institutionId: institutionId || null,
      }
    });

    // 2. Upsert del Perfil Profesional (por userId)
    const professional = await db.professional.upsert({
      where: { userId: user.id },
      update: {
        licenseNumber,
        specialty,
        phoneNumber: phone,
        address,
      },
      create: {
        userId: user.id,
        licenseNumber,
        specialty,
        phoneNumber: phone,
        address,
      }
    });

    console.log(`[HIS SYNC] Profesional ${username} sincronizado correctamente.`);

    return NextResponse.json({ 
        status: "SUCCESS", 
        userId: user.id, 
        professionalId: professional.id 
    });

  } catch (error: any) {
    console.error("[HIS SYNC ERROR]:", error);
    return NextResponse.json({ error: "Error interno al sincronizar profesional", details: error.message }, { status: 500 });
  }
}
