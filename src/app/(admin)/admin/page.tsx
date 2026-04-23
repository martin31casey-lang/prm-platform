import Link from "next/link";
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Calendar,
  MoreVertical,
  Plus
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Resumen Operativo</h1>
        <p className="text-slate-500 font-medium">Estado actual de su institución en la red VitalPlus.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Pacientes Hoy", value: "124", color: "text-blue-600", icon: <Users className="w-5 h-5" /> },
          { label: "Consultas Telemed.", value: "48", color: "text-indigo-600", icon: <Activity className="w-5 h-5" /> },
          { label: "Tasa de Ausentismo", value: "12%", color: "text-emerald-600", icon: <TrendingUp className="w-5 h-5" /> },
          { label: "Médicos Activos", value: "15", color: "text-slate-900", icon: <Calendar className="w-5 h-5" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-slate-50 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <button className="text-slate-300 hover:text-slate-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* News & Config Card */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
           <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Control de Novedades en Landing</h3>
                <p className="text-xs text-slate-400 font-medium">Active hasta 5 noticias para mostrar en su web institucional.</p>
              </div>
              <Link href="/admin/news" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
                 <Plus className="w-3 h-3" /> Gestionar Todo
              </Link>
           </div>
           <div className="p-8 space-y-4">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Noticias Seleccionadas (3/5)</span>
              </div>
              {[
                { title: "Campaña de Vacunación 2026", date: "Activa", active: true },
                { title: "Nueva Sede en Palermo Soho", date: "Activa", active: true },
                { title: "Protocolo de Invierno", date: "Inactiva", active: false },
                { title: "Ampliación de Horarios Telemedicina", date: "Activa", active: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                   <div className="flex items-center gap-4">
                      <div className={`h-2 w-2 rounded-full ${item.active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                      <div>
                        <div className="text-sm font-bold text-slate-900">{item.title}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">{item.active ? 'Visible en Landing' : 'Oculta'}</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      {/* Slider Toggle UI */}
                      <button className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${item.active ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                         <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${item.active ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Branding Sidebar */}
        <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white space-y-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-10 -mt-10 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
           
           <div>
              <h3 className="text-xl font-bold mb-2 italic tracking-tight">Marca Blanca</h3>
              <p className="text-indigo-200 text-sm">Personalice el portal con la identidad de su institución.</p>
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Logo Institucional</label>
                 <div className="h-32 w-full bg-indigo-800/50 rounded-2xl border-2 border-dashed border-indigo-500 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-indigo-800 transition-colors">
                    <Plus className="w-6 h-6 text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-400">Subir SVG o PNG</span>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Color Primario</label>
                 <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-600 border-2 border-white ring-4 ring-indigo-500/20" />
                    <div className="h-10 w-10 rounded-full bg-emerald-500 border-2 border-white/20" />
                    <div className="h-10 w-10 rounded-full bg-rose-500 border-2 border-white/20" />
                    <div className="h-10 w-10 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                    </div>
                 </div>
              </div>

              <button className="w-full py-4 bg-white text-indigo-900 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl">
                 Guardar Configuración
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
