"use client";

import { 
  Calendar, 
  ClipboardList, 
  Activity, 
  Clock, 
  MessageSquare, 
  Bell, 
  Stethoscope,
  ChevronRight,
  Search,
  MapPin,
  Phone,
  Navigation,
  ArrowRight,
  Plus,
  Video
} from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { PLATFORM_CONFIG } from "~/config/platform";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { data: patient } = api.patient.getOnboardingStatus.useQuery();
  const { data: frequentCenters } = api.patient.getFrequentCenters.useQuery();
  
  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-12">
      {/* Header de Bienvenida Premium & Branding Dinámico */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 bg-slate-900"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Portal Exclusivo</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight font-outfit uppercase">
            {session?.user?.name?.split(' ')[0] || 'Paciente'}, Bienvenido
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium">{PLATFORM_CONFIG.institutionName} • Mi Salud Online</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/appointments" 
            className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-xl hover:shadow-red-600/20 active:scale-95 text-xs uppercase tracking-widest"
          >
            Solicitar Turno
          </Link>
        </div>
      </div>

      {/* Notificaciones de Usuario / Estado Onboarding */}
      {!patient?.onboardingCompleted && (
        <div className="soft-card bg-slate-900 p-6 border-none text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Completa tu legajo digital</h3>
              <p className="text-slate-400 text-sm italic">Habilitarás el acceso a resultados y recetas automáticas.</p>
            </div>
            <Link 
              href="/onboarding" 
              className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all text-sm uppercase tracking-wider"
            >
              Completar Perfil
            </Link>
          </div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </div>
      )}


      {/* Sección: MIS CENTROS FRECUENTES (Personalización por Paciente) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
             <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
             <h2 className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight uppercase">Mis Centros Frecuentes</h2>
          </div>
          <Link href="/map" className="text-[10px] font-black text-slate-400 hover:text-slate-900 tracking-[0.2em] transition-colors">VER TODAS LAS SEDES</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frequentCenters && frequentCenters.length > 0 ? (
            frequentCenters.map((center) => (
              <CenterDashboardCard key={center.id} center={center} isFrequent={true} />
            ))
          ) : (
            // Fallback: Mostrar centros recomendados si no hay frecuentes
            PLATFORM_CONFIG.centers.slice(0, 3).map((center) => (
              <CenterDashboardCard key={center.id} center={center} isFrequent={false} />
            ))
          )}
        </div>
        
        {(!frequentCenters || frequentCenters.length === 0) && (
          <p className="text-center text-slate-400 text-xs font-medium italic pt-4">
            Aún no tienes centros frecuentes. Se muestran las sedes principales por cercanía.
          </p>
        )}
      </div>

      {/* Sección: Centro de Notificaciones y Mensajes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="soft-card p-6 bg-slate-50/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-widest">Mensajes Recientes</h3>
            <Link href="/messages" className="text-[10px] font-bold text-slate-500 hover:text-slate-900 tracking-widest decoration-1 underline-offset-4 underline">Bandeja de Entrada</Link>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-slate-300 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-4 ring-slate-100 italic">
                  Dr
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold text-slate-900">{i === 1 ? 'Dr. Alejandro Sanz' : 'Dra. Elena García'}</p>
                    <span className="text-[9px] font-bold text-slate-400">Hace {i * 2}h</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate leading-relaxed">Indicaciones post-estudio enviadas. Por favor revise su correo.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="soft-card p-6">
          <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-widest mb-6">Alertas del Sistema</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border-l-4 border-indigo-600 bg-indigo-50/30 rounded-r-xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                 <Video className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">Teleconsulta en 15 min</p>
                <p className="text-xs text-slate-500 mt-1">Tu cita con el Dr. Alejandro Sanz está por comenzar.</p>
                <Link href="/telemedicine" className="text-[10px] font-black text-white uppercase tracking-widest mt-3 inline-block bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded transition-colors shadow-lg shadow-indigo-600/20">Ingresar a Sala</Link>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border-l-4 border-slate-900 bg-white rounded-r-xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                 <Bell className="w-5 h-5 text-slate-900" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">Estudios Disponibles</p>
                <p className="text-xs text-slate-500 mt-1">Laboratorio Central ha cargado tus resultados del 15/04.</p>
                <Link href="/health" className="text-[10px] font-black text-slate-900 uppercase tracking-widest mt-3 inline-block bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded transition-colors">Ver ahora</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CenterDashboardCard({ center, isFrequent }: { center: any, isFrequent: boolean }) {
  return (
    <div className="soft-card overflow-hidden group flex flex-col relative">
       {isFrequent && (
         <div className="absolute top-4 right-4 z-20">
            <div className="bg-blue-600 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
               <Plus className="w-2 h-2" />
               Frecuente
            </div>
         </div>
       )}
       <div className="h-40 overflow-hidden relative">
          <img 
            src={center.image || '/images/sede-placeholder.png'} 
            alt={center.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute top-4 left-4">
             <span className="bg-white/90 backdrop-blur text-slate-900 text-[9px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-sm">
                {center.type}
             </span>
          </div>
          <div className="absolute bottom-4 right-4 group-hover:translate-x-1 transition-transform">
             <div className="bg-slate-900 text-white p-2 rounded-lg shadow-xl">
                <Navigation className="w-4 h-4" />
             </div>
          </div>
       </div>
       <div className="p-5 flex-1 flex flex-col">
          <h4 className="text-lg font-bold text-slate-900 mb-1">{center.name}</h4>
          <div className="flex items-center text-slate-400 text-xs mb-4">
             <MapPin className="w-3 h-3 mr-1" />
             {center.address}
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
             <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Espera Guardia</span>
                <span className={`text-sm font-bold ${center.status === 'normal' || !center.status ? 'text-green-600' : 'text-amber-500'}`}>
                   {center.guardTime || '10 min'}
                </span>
             </div>
             <a href={`tel:${center.phone?.replace(/\s/g, '')}`} className="p-2 rounded-full hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-900">
                <Phone className="w-4 h-4" />
             </a>
          </div>
       </div>
    </div>
  );
}
