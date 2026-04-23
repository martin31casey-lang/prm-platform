import "~/styles/globals.css";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Bell, 
  LogOut, 
  Building2,
  PieChart
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Corporativo */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-indigo-600 rounded-md" />
            <span className="text-sm font-black tracking-tighter">VITALPLUS<span className="text-indigo-600">ADMIN</span></span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-colors">
            <Bell className="w-4 h-4" /> Novedades
          </Link>
          <Link href="/admin/staff" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-colors">
            <Users className="w-4 h-4" /> Staff Médico
          </Link>
          <Link href="/admin/branding" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-colors">
            <PieChart className="w-4 h-4" /> Marca Blanca
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-colors">
            <Settings className="w-4 h-4" /> Configuración
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-colors mt-2">
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Bienvenido, Admin Sanatorio Central
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300" />
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
