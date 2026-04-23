"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { Loader2, HeartPulse } from "lucide-react";

export function ProfileGate({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    
    const { data: patient, isLoading } = api.patient.getOnboardingStatus.useQuery(undefined, {
        enabled: status === "authenticated",
        // Evitamos refetch constantes mientras estamos en onboarding
        staleTime: Infinity, 
    });

    // Rutas que no deben ser procesadas por la lógica de pacientes (públicas, staff o admin)
    const isExcludedRoute = 
        pathname === "/" || 
        pathname.startsWith("/auth") || 
        pathname.startsWith("/staff") || 
        pathname.startsWith("/admin");

    useEffect(() => {
        if (!mounted) return;

        if (status === "unauthenticated" && !isExcludedRoute) {
            router.push("/auth/signin");
            return;
        }

        if (patient && !patient.onboardingCompleted && pathname !== "/onboarding" && !isExcludedRoute) {
            router.push("/onboarding");
        }
        
        if (patient?.onboardingCompleted && pathname === "/onboarding") {
            router.push("/dashboard");
        }
    }, [status, patient, pathname, router, isExcludedRoute, mounted]);

    // Si no está montado, devolvemos nada para evitar el Hydration Mismatch
    if (!mounted) return null;

    // Solo mostramos el cargador de pantalla completa si NO es una ruta excluida
    // y la sesión o los datos están cargando.
    if (!isExcludedRoute && (status === "loading" || (status === "authenticated" && isLoading))) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 gap-6">
                <div className="h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-900/10 animate-pulse">
                    <HeartPulse className="h-10 w-10 text-white" />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-6 w-6 text-slate-400 animate-spin" />
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Autenticando Acceso</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
