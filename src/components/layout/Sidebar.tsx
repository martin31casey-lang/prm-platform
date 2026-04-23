"use client";

import { 
  HeartPulse, 
  Calendar, 
  FileText, 
  UserCircle, 
  LogOut,
  ChevronRight,
  LayoutDashboard,
  Pill,
  Zap,
  Video,
  X
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { PLATFORM_CONFIG } from "~/config/platform";

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard", href: "/dashboard" },
    { icon: <FileText className="h-4 w-4" />, label: "Historia 360", href: "/health" },
    { icon: <Calendar className="h-4 w-4" />, label: "Mis Turnos", href: "/appointments" },
    { icon: <Pill className="h-4 w-4" />, label: "Recetas", href: "/prescriptions" },
    { icon: <Video className="h-4 w-4" />, label: "Telemedicina", href: "/telemedicine" },
    { icon: <Zap className="h-4 w-4" />, label: "Guardia Connect", href: "/guardia" },
    { icon: <UserCircle className="h-4 w-4" />, label: "Mi Cuenta", href: "/account" },
  ];

  return (
    <aside className="w-72 h-full border-r border-slate-100 bg-white flex flex-col shrink-0 z-20 shadow-2xl lg:shadow-none">
      <div className="p-6 lg:p-10 flex-1">
        <div className="flex items-center justify-between mb-8 lg:mb-14">
          <div className="flex items-center gap-4 px-2">
            <div className="h-12 w-12 luxury-gradient rounded-[1.2rem] flex items-center justify-center shadow-xl shadow-blue-500/20 rotate-3">
              <HeartPulse className="h-7 w-7 text-white -rotate-3" />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
                 {PLATFORM_CONFIG.institutionName.split(' ')[1] || 'QUANTUM'}<span className="text-blue-600">.</span>
               </span>
               <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 -mt-1">Experience</span>
            </div>
          </div>

          {/* Botón de cerrar solo en mobile */}
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <nav className="space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center group px-5 py-4 rounded-[1.4rem] transition-all duration-500 ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20" 
                    : "text-slate-400 hover:bg-white hover:text-blue-600 hover:shadow-lg hover:shadow-slate-100"
                }`}
              >
                <div className={`mr-4 transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                    {item.icon}
                </div>
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-8 pb-12">
        <div className="premium-card p-5 rounded-[2rem] mb-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl border-2 border-white bg-blue-50 flex items-center justify-center overflow-hidden shadow-inner">
                    {session?.user?.image ? (
                    <img src={session.user.image} alt="profile" className="h-full w-full object-cover" />
                    ) : (
                    <div className="h-full w-full bg-slate-900 flex items-center justify-center text-white text-xs font-black">
                        {session?.user?.name?.charAt(0) ?? "U"}
                    </div>
                    )}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-extrabold truncate text-slate-900 tracking-tight">{session?.user?.name ?? "Cargando..."}</p>
                    <div className="flex items-center gap-1.5">
                        <div className="h-1 w-1 rounded-full bg-blue-500"></div>
                        <p className="text-[10px] text-blue-600 uppercase tracking-widest font-black">Paciente Pro</p>
                    </div>
                </div>
            </div>
            
            <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-red-500 py-2.5 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-red-50 hover:bg-red-50/30"
            >
                <LogOut className="h-3.5 w-3.5" />
                Cerrar sesión
            </button>
        </div>
        
        <p className="text-[9px] text-center text-slate-300 font-bold uppercase tracking-[0.2em]">
            Shield v2.0 Secured
        </p>
      </div>
    </aside>
  );
}



