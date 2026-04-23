"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  MapPin, 
  Shield, 
  Phone, 
  Mail, 
  Save, 
  Edit3, 
  CheckCircle2, 
  AlertCircle,
  Camera,
  CreditCard
} from "lucide-react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

export default function AccountPage() {
  const { data: session, update: updateSession } = useSession();
  const utils = api.useUtils();
  
  const { data: profile, isLoading } = api.patient.getFullProfile.useQuery();
  const { data: insuranceProviders } = api.patient.getInsuranceProviders.useQuery();
  
  const updateProfile = api.patient.updateFullProfile.useMutation({
    onSuccess: async () => {
      setSuccess(true);
      await utils.patient.getFullProfile.invalidate();
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (e) => {
      setError(e.message);
      setTimeout(() => setError(""), 5000);
    }
  });

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    insuranceProviderId: "",
    insurancePlanId: "",
    membershipNumber: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.user?.name || "",
        phoneNumber: profile.phoneNumber || "",
        address: profile.address || "",
        city: profile.city || "",
        postalCode: profile.postalCode || "",
        insuranceProviderId: profile.insuranceProviderId || "",
        insurancePlanId: profile.insurancePlanId || "",
        membershipNumber: profile.membershipNumber || "",
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(formData);
    setIsEditing(false);
  };

  const selectedProvider = insuranceProviders?.find(p => p.id === formData.insuranceProviderId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 lg:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Premium */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-8 bg-blue-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Gestión de Perfil</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight font-outfit uppercase">Mi Cuenta</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1 font-medium">Administra tus datos personales y cobertura médica.</p>
        </div>
        
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-xl active:scale-95 text-[10px] uppercase tracking-widest w-full md:w-auto"
          >
            <Edit3 className="w-4 h-4" />
            Editar Datos
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
             <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-4 bg-white text-slate-500 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-[10px] uppercase tracking-widest w-full sm:w-auto"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 text-[10px] uppercase tracking-widest w-full sm:w-auto"
              >
                <Save className="w-4 h-4" />
                Guardar Cambios
              </button>
          </div>
        )}
      </div>

      {success && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 animate-in zoom-in duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-wider">Perfil actualizado con éxito</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-2xl flex items-center gap-3 animate-in zoom-in duration-300">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-wider">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna Izquierda: Foto y Básicos */}
        <div className="md:col-span-1 space-y-8">
            <div className="soft-card p-8 flex flex-col items-center text-center">
                <div className="relative group">
                    <div className="h-32 w-32 rounded-[2.5rem] bg-slate-900 flex items-center justify-center text-white text-4xl font-black shadow-2xl overflow-hidden ring-8 ring-slate-50 transition-transform group-hover:scale-105 duration-500 italic">
                        {profile?.user?.image ? (
                            <img src={profile.user.image} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            profile?.user?.name?.charAt(0) || "U"
                        )}
                    </div>
                    {isEditing && (
                        <button className="absolute bottom-0 right-0 p-3 bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-blue-700 transition-all">
                            <Camera className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-slate-900">{profile?.user?.name}</h3>
                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest mt-1">DNI: {profile?.dni || 'No cargado'}</p>
                </div>
            </div>

            <div className="soft-card p-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs font-bold">{profile?.user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                    <Phone className="w-4 h-4" />
                    {isEditing ? (
                        <input 
                            type="text"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                            className="text-xs font-bold bg-slate-50 border-none rounded-lg w-full p-1 focus:ring-1 focus:ring-blue-500"
                        />
                    ) : (
                        <span className="text-xs font-bold">{profile?.phoneNumber || "Sin teléfono"}</span>
                    )}
                </div>
            </div>
        </div>

        {/* Columna Derecha: Detalles */}
        <div className="md:col-span-2 space-y-8">
            {/* Datos Filiatorios & Ubicación */}
            <div className="soft-card p-8 space-y-8">
                <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                    <MapPin className="w-5 h-5 text-slate-900" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Datos de Contacto y Ubicación</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre Completo</label>
                        <input 
                            disabled={!isEditing}
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dirección</label>
                        <input 
                            disabled={!isEditing}
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ciudad</label>
                        <input 
                            disabled={!isEditing}
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Código Postal</label>
                        <input 
                            disabled={!isEditing}
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                            className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60"
                        />
                    </div>
                </div>
            </div>

            {/* Cobertura Médica */}
            <div className="soft-card p-8 space-y-8">
                <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                    <Shield className="w-5 h-5 text-slate-900" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Cobertura Médica</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Obra Social / Prepaga</label>
                        <select 
                            disabled={!isEditing}
                            value={formData.insuranceProviderId}
                            onChange={(e) => setFormData({...formData, insuranceProviderId: e.target.value, insurancePlanId: ""})}
                            className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60 appearance-none"
                        >
                            <option value="">Seleccionar...</option>
                            {insuranceProviders?.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan</label>
                        <select 
                            disabled={!isEditing || !formData.insuranceProviderId}
                            value={formData.insurancePlanId}
                            onChange={(e) => setFormData({...formData, insurancePlanId: e.target.value})}
                            className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60 appearance-none"
                        >
                            <option value="">Seleccionar Plan...</option>
                            {selectedProvider?.plans.map(plan => (
                                <option key={plan.id} value={plan.id}>{plan.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Número de Credencial / Afiliado</label>
                        <div className="relative">
                            <input 
                                disabled={!isEditing}
                                type="text"
                                value={formData.membershipNumber}
                                onChange={(e) => setFormData({...formData, membershipNumber: e.target.value})}
                                className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none font-bold text-sm focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60"
                            />
                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>

                {!isEditing && profile?.insurance && (
                    <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{profile.insurance.name}</p>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Plan {profile.plan?.name}</p>
                            </div>
                        </div>
                        <span className="text-[10px] font-black bg-emerald-500 text-white px-3 py-1 rounded-full uppercase tracking-widest">Activo</span>
                    </div>
                )}
            </div>
        </div>
      </form>
    </div>
  );
}
