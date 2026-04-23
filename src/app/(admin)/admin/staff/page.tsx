import { 
  Plus, 
  Search, 
  UserPlus, 
  MoreVertical, 
  Stethoscope, 
  Mail, 
  Phone,
  Shield,
  MapPin
} from "lucide-react";

export default function StaffManagementPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Staff Médico</h1>
          <p className="text-slate-500 font-medium">Administre los profesionales y sedes de su institución.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-[1.2rem] text-sm font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-600/10">
          <UserPlus className="w-4 h-4" /> Agregar Profesional
        </button>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Médicos", value: "24", icon: <Stethoscope className="w-5 h-5 text-blue-600" /> },
          { label: "Sedes Activas", value: "3", icon: <MapPin className="w-5 h-5 text-indigo-600" /> },
          { label: "Usuarios Admin", value: "5", icon: <Shield className="w-5 h-5 text-emerald-600" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-slate-50 rounded-2xl">{stat.icon}</div>
             <div>
                <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
             </div>
          </div>
        ))}
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar por nombre o especialidad..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600/10 transition-all"
              />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Profesional</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Especialidad</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Contacto</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Estado</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: "Dr. Alberto Pérez", specialty: "Cardiología", email: "alberto.perez@clinica.com", phone: "+54 11 4567-8901", status: "Activo" },
                { name: "Dra. Lucía García", specialty: "Pediatría", email: "lucia.garcia@clinica.com", phone: "+54 11 4567-8902", status: "Activo" },
                { name: "Dr. Roberto Gómez", specialty: "Clínica Médica", email: "roberto.gomez@clinica.com", phone: "+54 11 4567-8903", status: "Licencia" },
                { name: "Dra. Elena Ruiz", specialty: "Dermatología", email: "elena.ruiz@clinica.com", phone: "+54 11 4567-8904", status: "Activo" },
              ].map((staff, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                          {staff.name.split(' ')[1].charAt(0)}
                       </div>
                       <div>
                          <div className="text-sm font-bold text-slate-900">{staff.name}</div>
                          <div className="text-[10px] text-slate-400 font-medium">Mat: 123456</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{staff.specialty}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                       <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                          <Mail className="w-3 h-3" /> {staff.email}
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                          <Phone className="w-3 h-3" /> {staff.phone}
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${staff.status === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-slate-300 hover:text-slate-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/50">
           <span className="text-xs text-slate-400 font-medium">Mostrando 4 de 24 profesionales</span>
           <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white transition-all">Anterior</button>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-white transition-all">Siguiente</button>
           </div>
        </div>
      </div>
    </div>
  );
}
