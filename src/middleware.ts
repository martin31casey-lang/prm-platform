import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // 1. DOMINIO CORPORATIVO (VitalFlow)
  const isCorporate = 
    hostname.includes("localhost") || 
    hostname === "prm-platform.vercel.app" ||
    hostname.endsWith(".vercel.app");

  if (isCorporate) {
    // Ya no reescribimos / a /landing porque VitalFlow vive en el / real.
    return NextResponse.next();
  }

  // 2. DOMINIO DE INSTITUCIÓN (Tenant)
  if (url.pathname === "/") {
    // Si entran por un dominio de cliente, les mostramos Quantum
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
