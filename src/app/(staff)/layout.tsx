"use client";

import "~/styles/globals.css";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Bell, 
  LogOut, 
  Video,
  Activity,
  Calendar,
  ClipboardList
} from "lucide-react";

import StaffHeader from "../_components/StaffHeader";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar Médico */}
      <aside className="w-20 lg:w-64 bg-slate-900 flex flex-col fixed h-full z-40 transition-all duration-300">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="hidden lg:block text-white text-sm font-black tracking-tighter uppercase italic">
              VitalPlus <span className="text-indigo-400">Staff</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link 
            href="/staff/console" 
            className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all hover:bg-white/15"
          >
            <Video className="w-5 h-5" /> 
            <span className="hidden lg:block">Consola Guardia</span>
          </Link>
          
          <Link 
            href="#" 
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all"
          >
            <Calendar className="w-5 h-5" /> 
            <span className="hidden lg:block">Agenda</span>
          </Link>

          <Link 
            href="#" 
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all"
          >
            <ClipboardList className="w-5 h-5" /> 
            <span className="hidden lg:block">Historia Clínica</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link 
            href="#" 
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" /> 
            <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">Config</span>
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: "/staff/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all mt-2"
          >
            <LogOut className="w-5 h-5" /> 
            <span className="hidden lg:block">Salir</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-20 lg:ml-64 flex flex-col min-h-screen overflow-hidden">
        <StaffHeader />

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          {children}
        </div>
      </main>
    </div>
  );
}
