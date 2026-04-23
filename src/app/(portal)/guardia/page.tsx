"use client";

import { useState } from "react";
import { 
    Clock, 
    Users, 
    MapPin, 
    ArrowRight,
    Zap,
    Stethoscope,
    Navigation,
    Loader2,
    ChevronLeft
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { PLATFORM_CONFIG } from "~/config/platform";

type Step = 'START' | 'SPECIALTY' | 'CENTERS';

export default function GuardiaPage() {
    const [step, setStep] = useState<Step>('START');
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

    const specialties = [
        { id: 'clinica', label: 'Clínica Médica', icon: <Stethoscope /> },
        { id: 'pedia', label: 'Pediatría', icon: <Users /> },
        { id: 'trauma', label: 'Traumatología', icon: <Activity /> },
        { id: 'oftalmo', label: 'Oftalmología', icon: <Zap /> },
    ];

    // Mock de estados por centro basado en la especialidad
    const getCentersForSpecialty = (spec: string) => {
        return PLATFORM_CONFIG.centers.map(center => ({
            ...center,
            queueCount: Math.floor(Math.random() * 20) + 5,
            distance: (Math.random() * 10 + 1).toFixed(1),
            active: spec !== 'oftalmo' || center.id === 'sede-central' // Solo la central tiene oftalmo en este mock
        }));
    };

    if (step === 'START') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12 animate-in fade-in duration-700">
                <div className="space-y-4">
                    <h2 className="text-6xl font-black tracking-tighter text-slate-950 uppercase italic">GUARDIA CONNECT</h2>
                    <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
                        Evita esperas innecesarias. Regístrate virtualmente en nuestras guardias activas y sigue tu turno en tiempo real.
                    </p>
                </div>
                
                <button 
                    onClick={() => setStep('SPECIALTY')}
                    className="group relative px-20 py-8 bg-slate-950 text-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-105 transition-all active:scale-95"
                >
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span className="relative z-10 text-xl font-black uppercase tracking-[0.3em] flex items-center gap-4">
                        INICIAR <ArrowRight className="h-6 w-6" />
                    </span>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl pt-10">
                    <Feature small title="Triage Virtual" desc="Evaluación previa de síntomas" />
                    <Feature small title="Fila en Tiempo Real" desc="Conoce tu posición exacta" />
                    <Feature small title="Notificación Push" desc="Te avisamos cuando venir" />
                </div>
            </div>
        );
    }

    if (step === 'SPECIALTY') {
        return (
            <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                <button onClick={() => setStep('START')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                    <ChevronLeft className="h-4 w-4" /> Volver
                </button>
                <div className="space-y-2">
                    <h2 className="text-4xl font-black tracking-tight text-slate-950 uppercase">Paso 1: Especialidad</h2>
                    <p className="text-slate-500 font-bold">Selecciona el tipo de guardia que necesitas para ver sedes disponibles.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {specialties.map((spec) => (
                        <button 
                            key={spec.id}
                            onClick={() => { setSelectedSpecialty(spec.label); setStep('CENTERS'); }}
                            className="bg-white border-2 border-slate-100 hover:border-slate-950 p-10 rounded-[2.5rem] flex flex-col items-center text-center gap-4 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group"
                        >
                            <div className="h-16 w-16 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center transition-all">
                                {spec.icon}
                            </div>
                            <span className="font-black uppercase tracking-tighter text-lg text-slate-900">{spec.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    const availableCenters = getCentersForSpecialty(selectedSpecialty!);

    return (
        <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 pb-20">
            <button onClick={() => setStep('SPECIALTY')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                <ChevronLeft className="h-4 w-4" /> Volver a Especialidades
            </button>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black tracking-tight text-slate-950 uppercase">Paso 2: Elegir Sede</h2>
                    <p className="text-slate-500 font-bold">Mostrando centros con guardia operativa de <span className="text-blue-600 uppercase underline decoration-2 underline-offset-4">{selectedSpecialty}</span>.</p>
                </div>
                <Badge className="bg-emerald-500 text-white border-none px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                    HIS Conectado
                </Badge>
            </div>

            <div className="grid gap-8">
                {availableCenters.map((center) => (
                    <div key={center.id} className={`bg-white border-2 p-10 rounded-[3rem] transition-all relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 ${center.active ? 'border-slate-100 shadow-xl' : 'opacity-40 grayscale border-dashed border-slate-200'}`}>
                        {!center.active && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                                <span className="bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.4em] px-8 py-3 rounded-full">Servicio no disponible en esta sede</span>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-8">
                            <div className="h-24 w-24 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl shrink-0">
                                <img src={center.image} alt={center.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black text-slate-950 tracking-tighter uppercase italic">{center.name}</h3>
                                <div className="flex items-center gap-4 text-slate-400 font-bold text-sm">
                                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-blue-500" /> {center.address}</span>
                                    <span className="text-slate-200">•</span>
                                    <span className="flex items-center gap-1.5"><Navigation className="h-4 w-4 text-slate-900" /> {center.distance} km</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-12">
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">En Fila</p>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-blue-500" />
                                    <span className="text-3xl font-black text-slate-950">{center.queueCount}</span>
                                </div>
                            </div>
                            <div className="h-16 w-px bg-slate-100 hidden lg:block"></div>
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Espera Est.</p>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-emerald-500" />
                                    <span className="text-3xl font-black text-slate-950">{center.queueCount * 6}m</span>
                                </div>
                            </div>
                            <button disabled={!center.active} className="px-10 py-5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                                PONERSE EN LÍNEA
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Feature({ title, desc, small }: { title: string, desc: string, small?: boolean }) {
    return (
        <div className="space-y-1">
            <h5 className="font-black text-slate-900 uppercase tracking-tighter text-sm italic">{title}</h5>
            <p className="text-xs text-slate-400 font-bold">{desc}</p>
        </div>
    );
}

function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
