import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MoreVertical,
  Image as ImageIcon,
  CheckCircle,
  Clock
} from "lucide-react";

export default function NewsManagementPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Centro de Novedades</h1>
          <p className="text-slate-500 font-medium">Gestione las comunicaciones institucionales para sus pacientes.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-[1.2rem] text-sm font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-600/10">
          <Plus className="w-4 h-4" /> Crear Noticia
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por título..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600/20 transition-all"
          />
        </div>
        <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all">
          <Filter className="w-4 h-4" /> Filtros
        </button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Campaña Vacunación 2026", date: "Hace 2 horas", status: "Activo", views: "1.2k", author: "Dr. Pérez" },
          { title: "Nueva Sede Palermo", date: "Hace 1 día", status: "Borrador", views: "0", author: "Admin" },
          { title: "Mantenimiento Portal", date: "15 Abr", status: "Activo", views: "850", author: "Sistemas" },
          { title: "Protocolo COVID-26", date: "10 Abr", status: "Activo", views: "3.4k", author: "Comité" },
        ].map((news, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden group hover:border-indigo-300 transition-all shadow-sm">
            <div className="aspect-video bg-slate-100 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                  <ImageIcon className="w-12 h-12" />
               </div>
               <div className="absolute top-4 left-4">
                  <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-lg shadow-sm ${news.status === 'Activo' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {news.status}
                  </span>
               </div>
            </div>
            <div className="p-8 space-y-4">
               <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{news.title}</h3>
                  <button className="p-1 text-slate-300 hover:text-slate-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
               </div>
               
               <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {news.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {news.views} vistas
                  </div>
               </div>

               <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="h-6 w-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-[8px]">
                        {news.author.charAt(0)}
                     </div>
                     <span className="text-[10px] font-bold text-slate-500">{news.author}</span>
                  </div>
                  <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline">
                    Editar Noticia
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
