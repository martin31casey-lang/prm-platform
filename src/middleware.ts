import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // 1. SI ES EL DOMINIO CORPORATIVO (VitalPlus / VitalFlow)
  const isCorporate = hostname.includes("localhost") || hostname.includes("prm-platform.vercel.app");

  if (isCorporate) {
    if (url.pathname === "/") {
      return NextResponse.rewrite(new URL("/landing", req.url));
    }
    return NextResponse.next();
  }

  // 2. SI ES UN DOMINIO DE CLIENTE (Quantum, etc.)
  if (url.pathname === "/") {
    // Redirigir a la landing LIMPIA de la institución
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
