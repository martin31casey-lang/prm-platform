"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { 
  Bell, 
  ChevronDown, 
  LogOut, 
  CheckCircle2, 
  Clock as ClockIcon, 
  Circle 
} from "lucide-react";

export default function StaffHeader() {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [statusOnline, setStatusOnline] = useState<'available' | 'away' | 'busy'>('available');

  const doctorName = session?.user?.name || "Profesional de Salud";

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Personal de Salud</span>
        <div className="text-sm font-bold text-slate-900">{doctorName}</div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
          <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${
            statusOnline === 'available' ? 'bg-emerald-600' : 
            statusOnline === 'away' ? 'bg-amber-500' : 'bg-red-500'
          }`} />
          {statusOnline === 'available' ? 'Sincronizado HIS' : 
           statusOnline === 'away' ? 'En Pausa' : 'Ocupado'}
        </div>
        
        <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <Bell className="w-5 h-5" />
        </button>

        {/* Avatar Interactivo con Menú */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 h-10 px-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-md transition-all group"
          >
            <div className="relative h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-600/10">
                {doctorName.charAt(0)}
                <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                  statusOnline === 'available' ? 'bg-emerald-500' : 
                  statusOnline === 'away' ? 'bg-amber-500' : 'bg-red-500'
                }`}></div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-4 z-40 animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-3 border-b border-slate-50 mb-2 text-right">
                      <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{doctorName}</p>
                      <p className="text-[9px] font-bold text-slate-400">{session?.user?.email}</p>
                  </div>
                  
                  <div className="space-y-1">
                      <button 
                        onClick={() => { setStatusOnline('available'); setIsProfileOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${statusOnline === 'available' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50 text-slate-600'}`}
                      >
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs font-bold">Disponible</span>
                      </button>
                      <button 
                        onClick={() => { setStatusOnline('away'); setIsProfileOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${statusOnline === 'away' ? 'bg-amber-50 text-amber-700' : 'hover:bg-slate-50 text-slate-600'}`}
                      >
                          <ClockIcon className="w-4 h-4" />
                          <span className="text-xs font-bold">Ausente</span>
                      </button>
                      <button 
                        onClick={() => { setStatusOnline('busy'); setIsProfileOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${statusOnline === 'busy' ? 'bg-red-50 text-red-700' : 'hover:bg-slate-50 text-slate-600'}`}
                      >
                          <Circle className="w-4 h-4 fill-current" />
                          <span className="text-xs font-bold">Ocupado</span>
                      </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-50">
                      <button 
                        onClick={() => signOut({ callbackUrl: "/staff/login" })}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                      >
                          <LogOut className="w-4 h-4" />
                          <span className="text-xs font-bold">Cerrar Sesión</span>
                      </button>
                  </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
