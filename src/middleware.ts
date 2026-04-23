import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.nextUrl.hostname;

  // 1. DOMINIO CORPORATIVO (VitalFlow)
  // Si estamos en localhost o en cualquier dominio de Vercel que no hayamos mapeado, 
  // mostramos la landing corporativa (VitalFlow).
  const isCorporateDomain = 
    hostname.includes("localhost") || 
    hostname.includes("vercel.app") || 
    hostname.includes("vitalplus") || 
    hostname.includes("vitalflow");

  if (isCorporateDomain) {
    // VitalFlow vive en el / real.
    return NextResponse.next();
  }

  // 2. PROTECCIÓN DE RUTAS DE STAFF
  // Si intentan entrar a /staff/console sin estar en el portal corporativo o sin sesión
  if (url.pathname.startsWith("/staff") && !url.pathname.includes("/login")) {
    // Aquí podrías añadir un chequeo de sesión real si usaras auth() en el middleware,
    // pero por ahora dejemos que NextAuth maneje la sesión y nosotros solo orientamos la URL.
    // (Opcional: Si quieres forzar el login de staff, lo redirigimos aquí)
  }

  // 3. DOMINIO DE INSTITUCIÓN (Tenant)
  if (url.pathname === "/") {
    // Si NO es el dominio corporativo, REDIRIGIMOS (307) a la landing de la institución
    // Esto cambia la URL en el navegador y evita errores de historial.
    return NextResponse.redirect(new URL("/quantum-home", req.url));
  }

  // El resto de rutas (/dashboard, etc.) fluyen hacia (portal) o (admin) según corresponda
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
  ],
};
