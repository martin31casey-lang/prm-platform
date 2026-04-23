"use client";

import { 
  Plus, 
  Search, 
  UserPlus, 
  MoreVertical, 
  Stethoscope, 
  Mail, 
  Phone,
  Shield,
  MapPin,
  X,
  Loader2,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function StaffManagementPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  // TRPC Queries & Mutations
  const utils = api.useUtils();
  const { data: staffList, isLoading } = api.staff.list.useQuery();
  const createStaff = api.staff.create.useMutation({
    onSuccess: () => {
      utils.staff.list.invalidate();
      setShowAddModal(false);
      setIsCreating(false);
      alert("✅ Profesional creado con éxito");
    },
    onError: (err) => {
      setIsCreating(false);
      alert("❌ Error al crear: " + err.message);
    }
  });
  const deleteStaff = api.staff.delete.useMutation({
    onSuccess: () => {
      utils.staff.list.invalidate();
      alert("🗑️ Profesional eliminado");
    }
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    licenseNumber: "",
    specialty: "Clínica Médica",
    phone: "",
    address: "",
    username: "",
    password: ""
  });

  const specialties = [
    "Clínica Médica",
    "Pediatría",
    "Dermatología",
    "Traumatología",
    "Ginecología",
    "Cardiología",
    "Nutrición"
  ];

  const handleCreateTestUser = async () => {
    setIsCreating(true);
    await createStaff.mutateAsync({
      firstName: "Test",
      lastName: "Test",
      licenseNumber: "1234",
      specialty: "Clínica Médica",
      username: "Test",
      password: "1234",
      phone: "1122334455",
      address: "Sede Virtual Digital"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await createStaff.mutateAsync(formData);
    } catch (err) {
      console.error(err);
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Staff Médico</h1>
          <p className="text-slate-500 font-medium">Gestión de profesionales 100% Digital para Telemedicina.</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={handleCreateTestUser}
                disabled={isCreating}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100"
            >
                {isCreating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                Auto-Crear Test/1234
            </button>
            <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-[1.2rem] text-sm font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-600/10"
            >
                <UserPlus className="w-4 h-4" /> Agregar Profesional
            </button>
        </div>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Profesionales Digitales", value: staffList?.length || "0", icon: <Stethoscope className="w-5 h-5 text-blue-600" /> },
          { label: "Sede Activa", value: "Digital", icon: <MapPin className="w-5 h-5 text-indigo-600" /> },
          { label: "Especialidades", value: "7", icon: <Shield className="w-5 h-5 text-emerald-600" /> },
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
                placeholder="Buscar por nombre o matrícula..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600/10 transition-all"
              />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Profesional / Matrícula</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Especialidad</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Usuario Acceso</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                    <td colSpan={4} className="p-10 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="w-8 h-8 animate-spin text-slate-200" />
                            <span className="text-xs font-bold text-slate-400">Cargando profesionales...</span>
                        </div>
                    </td>
                </tr>
              ) : staffList?.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold uppercase">
                          {staff.name?.charAt(0) ?? "D"}
                       </div>
                       <div>
                          <div className="text-sm font-bold text-slate-900">{staff.name}</div>
                          <div className="text-[10px] text-slate-400 font-medium">Mat: {staff.professional?.licenseNumber || '---'}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{staff.professional?.specialty || 'General'}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <Shield className="w-3 h-3" /> {staff.username || staff.email}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                        onClick={() => { if(confirm("¿Eliminar profesional?")) deleteStaff.mutate({ id: staff.id }) }}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Agregar Profesional */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Alta de Profesional</h3>
                        <p className="text-xs font-bold text-slate-400">Carga de datos para telemedicina digital.</p>
                    </div>
                    <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white rounded-xl transition-all">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nombre</label>
                            <input 
                                required
                                value={formData.firstName}
                                onChange={e => setFormData({...formData, firstName: e.target.value})}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Apellido</label>
                            <input 
                                required
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Matrícula</label>
                            <input 
                                required
                                value={formData.licenseNumber}
                                onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Especialidad</label>
                            <select 
                                value={formData.specialty}
                                onChange={e => setFormData({...formData, specialty: e.target.value})}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold"
                            >
                                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Usuario de Acceso</label>
                            <input 
                                required
                                value={formData.username}
                                onChange={e => setFormData({...formData, username: e.target.value})}
                                className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-sm font-black text-indigo-600" 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Contraseña</label>
                            <input 
                                required
                                type="password"
                                value={formData.password}
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                className="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-sm font-black text-indigo-600" 
                            />
                        </div>
                    </div>

                    <button 
                        disabled={isCreating}
                        type="submit"
                        className="w-full py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
                    >
                        {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar Alta de Profesional"}
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}
