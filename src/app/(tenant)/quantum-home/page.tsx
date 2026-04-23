"use client";

import Link from "next/link";
import { PLATFORM_CONFIG } from "~/config/platform";
import { 
  HeartPulse, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  CalendarDays, 
  FileText, 
  Pill,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  Shield,
  MapPin,
  Clock,
  Phone,
  Layout
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Navbar Premium */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 lg:py-6 max-w-7xl mx-auto w-full bg-white/60 backdrop-blur-3xl border-b border-slate-100">
        <div className="flex items-center gap-3 lg:gap-4">
            <div className="h-10 w-10 lg:h-12 lg:w-12 luxury-gradient rounded-xl lg:rounded-[1.2rem] flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-3">
              <HeartPulse className="h-6 w-6 lg:h-7 lg:w-7 text-white -rotate-3" />
            </div>
            <span className="text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900 font-serif lowercase italic">
                {PLATFORM_CONFIG.institutionName.split(' ')[1]?.toLowerCase() || 'pm'}<span className="text-blue-600">.</span>portal
            </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">
            <a href="#ecosistema" className="hover:text-blue-600 transition-colors">Ecosistema</a>
            <a href="#sedes" className="hover:text-blue-600 transition-colors">Sedes</a>
            <a href="#security" className="hover:text-blue-600 transition-colors">Seguridad</a>
        </div>
        
        <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/auth/signin" className="hidden sm:block text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
              Log In
            </Link>
            <Link href="/auth/signin" className="bg-slate-900 text-white px-6 lg:px-8 py-2.5 lg:py-3.5 rounded-full font-black text-[9px] lg:text-[10px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-slate-900/10 active:scale-95 cursor-pointer">
              Acceso a Pacientes
            </Link>
        </div>
      </nav>

      {/* Hero Section Luxury */}
      <section className="relative pt-12 lg:pt-32 pb-20 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-20 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[150px] opacity-60"></div>
        <div className="relative px-6 lg:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="max-w-3xl space-y-8 lg:space-y-12">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50/50 text-blue-600 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] border border-blue-100">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
               </span>
               {PLATFORM_CONFIG.institutionName} • Mi Salud Online
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 lg:mb-8 leading-[1.1] lg:leading-[0.9] text-slate-950 font-serif italic">
              Salud <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800">Sincronizada.</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-lg leading-relaxed font-medium">
              Elevando la experiencia asistencial de {PLATFORM_CONFIG.institutionName} a estándares de alta gama. Tus registros, turnos y guardias en un solo ecosistema.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Link href="/auth/signin" className="group bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1 cursor-pointer">
                  Acceder al Portal
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-10 py-5 rounded-[2rem] border-2 border-slate-100 hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 flex items-center justify-center gap-3">
                  <Stethoscope className="h-5 w-5 text-blue-500" />
                  Servicios Médicos
                </button>
            </div>
          </div>

          {/* Visual Hub Image */}
          <div className="relative hidden lg:flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-indigo-100/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="relative z-10 w-full max-w-[600px] animate-float">
               <div className="absolute -inset-4 bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/60 -z-10 shadow-2xl"></div>
               <img 
                 src="/images/medical-hub.png" 
                 alt="Quantum Medical Sync Hub" 
                 className="w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.12)] rounded-[2.5rem]"
               />
               
               {/* Micro-interaction labels */}
               <div className="absolute -top-10 -right-10 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white flex items-center gap-4 animate-bounce duration-[3000ms]">
                  <div className="h-10 w-10 luxury-gradient rounded-xl flex items-center justify-center">
                     <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">HC Sincronizada</p>
                     <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">Real-time Sync</p>
                  </div>
               </div>

               <div className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white flex items-center gap-4 animate-bounce duration-[4000ms]">
                  <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                     <ShieldCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Datos Seguros</p>
                     <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">HL7 FHIR Ready</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECCIÓN: NUESTROS SERVICIOS (Interactive Grid on Landing) */}
      <section className="py-24 px-12 bg-white relative z-10" id="ecosistema">
         <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
                <h2 className="text-5xl font-black tracking-tighter text-slate-950 uppercase italic">Nuestros Servicios</h2>
                <p className="text-slate-400 text-xl font-bold max-w-2xl mx-auto uppercase tracking-widest text-[12px]">
                    Centralizamos tu salud. Pasa el cursor sobre cada servicio para iniciar tu autogestión.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* SERVICIO: MIS TURNOS */}
                <ServiceLandingCard 
                    title="Mis Turnos" 
                    description="Gestiona tus citas médicas y consulta historial."
                    icon={<CalendarDays className="h-10 w-10" />}
                    color="bg-blue-50/50"
                    hoverBorder="hover:border-blue-200"
                    iconColor="text-blue-600"
                    actionText="Autogestiona tus turnos"
                />

                {/* SERVICIO: ESTUDIOS */}
                <ServiceLandingCard 
                    title="Estudios Médicos" 
                    description="Accede a tus informes y resultados de laboratorio."
                    icon={<FileText className="h-10 w-10" />}
                    color="bg-emerald-50/50"
                    hoverBorder="hover:border-emerald-200"
                    iconColor="text-emerald-600"
                    actionText="Ver mis estudios"
                />

                {/* SERVICIO: RECETAS */}
                <ServiceLandingCard 
                    title="Recetas Digitales" 
                    description="Gestiona tus prescripciones vigentes con validación institucional."
                    icon={<Pill className="h-10 w-10" />}
                    color="bg-amber-50/50"
                    hoverBorder="hover:border-amber-200"
                    iconColor="text-amber-600"
                    actionText="Ver mis recetas"
                />

                {/* SERVICIO: GUARDIA CONNECT */}
                <ServiceLandingCard 
                    title="Guardia Connect" 
                    description="Visualiza tiempos de espera y ponte en fila virtual."
                    icon={<Zap className="h-10 w-10" />}
                    color="bg-indigo-50/50"
                    hoverBorder="hover:border-indigo-200"
                    iconColor="text-indigo-600"
                    actionText="Ponte en línea 24/7"
                />
            </div>
         </div>
      </section>

      {/* SECCIÓN: NUESTRAS SEDES (Carousel Visual) */}
      <section className="py-32 px-12 bg-slate-50/50" id="sedes">
         <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
               <div className="h-1 w-12 bg-blue-600 mx-auto"></div>
               <h2 className="text-5xl font-black tracking-tighter text-slate-950 uppercase italic">Nuestras Sedes <span className="text-blue-600">Premium</span></h2>
               <p className="text-slate-400 text-[12px] font-bold uppercase tracking-widest max-w-xl mx-auto">Tecnología médica avanzada en cada uno de nuestros puntos de atención.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {PLATFORM_CONFIG.centers.map((center) => (
                  <div key={center.id} className="group overflow-hidden rounded-[2rem] border border-white bg-white/80 backdrop-blur-sm hover:border-slate-200 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)]">
                     <div className="h-72 overflow-hidden relative">
                        <img 
                          src={center.image} 
                          alt={center.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-6 right-6">
                           <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-950">Guardia: {center.guardTime}</span>
                           </div>
                        </div>
                     </div>
                     <div className="p-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2 block italic">{center.type}</span>
                        <h4 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter mb-4">{center.name}</h4>
                        <div className="space-y-4 border-t border-slate-50 pt-6">
                           <div className="flex items-center text-slate-500 text-xs font-bold uppercase tracking-wide">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3">
                                 <MapPin className="h-4 w-4 text-slate-400" />
                              </div>
                              {center.address}
                           </div>
                           <div className="flex items-center text-slate-500 text-xs font-bold uppercase tracking-wide">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3">
                                 <Phone className="h-4 w-4 text-slate-400" />
                              </div>
                              {center.phone}
                           </div>
                        </div>
                        <button className="mt-10 w-full py-5 rounded-[1.5rem] bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95">
                           Ver disponibilidad de turnos
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECCIÓN: CAMPAÑAS DE SALUD (Promociones del Config) */}
      <section className="py-24 px-12 bg-white">
         <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex items-center gap-4">
               <div className="h-px flex-1 bg-slate-100"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Programas de Prevención</span>
               <div className="h-px flex-1 bg-slate-100"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {PLATFORM_CONFIG.promotions.map((promo) => (
                  <div key={promo.id} className={`relative p-12 rounded-[3rem] overflow-hidden group cursor-pointer transition-transform hover:-translate-y-2 duration-500 ${promo.color}`}>
                     <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <HeartPulse className="h-48 w-48 text-white" />
                     </div>
                     <div className="relative z-10 space-y-6">
                        <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter max-w-sm">{promo.title}</h3>
                        <p className="text-white/80 text-lg font-bold leading-relaxed max-w-md">{promo.description}</p>
                        <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-colors shadow-xl">
                           {promo.cta}
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Security Banner Premium */}
      <section className="bg-slate-950 py-32 px-12 relative overflow-hidden" id="security">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.08),transparent)]"></div>
        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-20">
            <div className="max-w-xl space-y-8 text-center lg:text-left">
                <div className="h-20 w-20 rounded-3xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-8 mx-auto lg:mx-0">
                    <Shield className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    Datos Protegidos con <br /> <span className="text-blue-500">Shield™ Tech.</span>
                </h3>
                <p className="text-slate-400 text-xl leading-relaxed font-bold uppercase tracking-widest text-[11px]">
                    {PLATFORM_CONFIG.institutionName} garantiza la confidencialidad absoluta de tus registros médicos bajo estándares HL7 v3 y FHIR.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
                <SecurityBadge label="HL7 FHIR Certified" />
                <SecurityBadge label="HIPAA Compliant" />
                <SecurityBadge label="AES-256 Bit" />
                <SecurityBadge label="ISO 27001 Ready" />
            </div>
        </div>
      </section>

      {/* Footer Luxury */}
      <footer className="bg-white py-24 px-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="h-16 w-16 luxury-gradient rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-6">
                  <HeartPulse className="h-8 w-8 text-white -rotate-6" />
                </div>
                <span className="text-4xl font-black tracking-tighter text-slate-950 font-serif lowercase italic">
                    {PLATFORM_CONFIG.institutionName.split(' ')[1]?.toLowerCase() || 'pm'}<span className="text-blue-600">.</span>portal
                </span>
                <p className="text-slate-400 text-lg max-w-lg leading-relaxed font-medium uppercase tracking-widest text-[10px]">
                  El portal exclusivo de {PLATFORM_CONFIG.institutionName}
                </p>
                <div className="flex gap-4">
                   <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100 italic">
                      Soporte: {PLATFORM_CONFIG.supportPhone}
                   </div>
                </div>
            </div>
            
            <div className="w-full border-t border-slate-50 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                <div className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-300">
                    © 2026 {PLATFORM_CONFIG.institutionName} • Powered by Antigravity Labs
                </div>
                <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <a href="#" className="hover:text-blue-600">Privacy</a>
                    <a href="#" className="hover:text-blue-600">Protocol</a>
                    <a href="#" className="hover:text-blue-600">Support</a>
                </div>
            </div>
        </div>
      </footer>
    </main>
  );
}

function ServiceLandingCard({ title, description, icon, color, hoverBorder, iconColor, actionText }: { 
    title: string, 
    description: string,
    icon: any, 
    color: string, 
    hoverBorder: string, 
    iconColor: string,
    actionText: string 
}) {
    return (
        <Link href="/auth/signin" className="group block">
            <div className={`relative h-80 overflow-hidden rounded-[2.5rem] border-2 border-transparent ${color} ${hoverBorder} transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:bg-slate-950`}>
                {/* Vista Normal */}
                <div className="absolute inset-0 p-10 flex flex-col items-center text-center justify-between transition-all duration-500 group-hover:opacity-0 group-hover:scale-90">
                    <div className={`h-20 w-20 rounded-[1.8rem] bg-white shadow-xl flex items-center justify-center ${iconColor}`}>
                        {icon}
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter leading-tight font-sans">{title}</h3>
                        <p className="text-[14px] font-bold text-slate-600 leading-snug">{description}</p>
                    </div>
                </div>

                {/* Vista Hover (Autogestiona) */}
                <div className="absolute inset-0 p-10 flex flex-col items-center justify-center text-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-10 group-hover:translate-y-0">
                    <p className="text-white text-xl font-black uppercase tracking-tighter italic leading-tight">
                        {actionText}
                    </p>
                    <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                        <ArrowRight className="h-7 w-7 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Ingresar ahora</span>
                </div>
            </div>
        </Link>
    );
}

function SecurityBadge({ label }: { label: string }) {
    return (
        <div className="px-8 py-6 rounded-[2rem] bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-all">
            <CheckCircle2 className="h-6 w-6 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">{label}</span>
        </div>
    );
}
