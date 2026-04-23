import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // 1. DOMINIO CORPORATIVO (VitalFlow)
  // Si estamos en localhost o en cualquier dominio de Vercel que no hayamos mapeado, 
  // mostramos la landing corporativa (VitalFlow).
  const isCorporateDomain = 
    hostname.includes("localhost") || 
    hostname.includes("vercel.app") || 
    hostname.includes("vitalplus") || 
    hostname.includes("vitalflow");

  if (isCorporateDomain) {
    // Si estamos en la raíz, dejamos que Next.js muestre src/app/(corporate)/page.tsx
    if (url.pathname === "/") {
      return NextResponse.next();
    }
  }

  // 2. DOMINIO DE INSTITUCIÓN (Fallback / Tenants)
  // Si por alguna razón alguien entra a un subdominio que no es el principal, 
  // o si queremos forzar Quantum en una ruta específica.
  if (url.pathname === "/quantum") {
     return NextResponse.rewrite(new URL("/quantum-home", req.url));
  }

  // El resto de rutas (/dashboard, etc.) fluyen hacia (portal) o (admin) según corresponda
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
  ],
};
