"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    User, 
    Home, 
    Activity, 
    ShieldCheck, 
    ChevronRight, 
    ChevronLeft, 
    CheckCircle2,
    Search,
    Loader2,
    Lock
} from "lucide-react";
import { api } from "~/trpc/react";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    
    // Form States
    const [formData, setFormData] = useState({
        dni: "",
        address: "",
        city: "",
        postalCode: "",
        insuranceProviderId: "",
        insurancePlanId: "",
        membershipNumber: ""
    });

    const { data: providers } = api.patient.getInsuranceProviders.useQuery();
    const updateProfile = api.patient.updateProfile.useMutation({
        onSuccess: () => {
            router.push("/dashboard");
        }
    });

    const validateInsurance = api.patient.validateInsurance.useMutation({
        onSuccess: (data) => {
            setIsVerified(true);
            setIsValidating(false);
        },
        onError: (err) => {
            alert(err.message);
            setIsValidating(false);
        }
    });

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleValidate = async () => {
        setIsValidating(true);
        validateInsurance.mutate({
            providerId: formData.insuranceProviderId,
            membershipNumber: formData.membershipNumber
        });
    };

    const handleSubmit = () => {
        setIsLoading(true);
        updateProfile.mutate(formData as any);
    };

    const selectedProvider = providers?.find(p => p.id === formData.insuranceProviderId);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 py-20">
            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-16 px-12">
                    <div className="flex flex-col items-center gap-3">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-700 ${step >= 1 ? 'luxury-gradient text-white shadow-2xl shadow-blue-500/30 rotate-3' : 'bg-slate-100 text-slate-300'}`}>
                            <User className={`h-6 w-6 ${step >= 1 ? '-rotate-3' : ''}`} />
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${step >= 1 ? 'text-blue-600' : 'text-slate-300'}`}>Datos Personales</span>
                    </div>
                    <div className="h-0.5 flex-1 bg-slate-100 mx-6 rounded-full overflow-hidden">
                        <div className="h-full luxury-gradient transition-all duration-1000 ease-out" style={{ width: step >= 2 ? '100%' : '0%' }} />
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-700 ${step >= 2 ? 'luxury-gradient text-white shadow-2xl shadow-blue-500/30 rotate-3' : 'bg-slate-100 text-slate-300'}`}>
                            <Activity className={`h-6 w-6 ${step >= 2 ? '-rotate-3' : ''}`} />
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${step >= 2 ? 'text-blue-600' : 'text-slate-300'}`}>Institución & Salud</span>
                    </div>
                </div>

                <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-50 p-16 animate-in fade-in zoom-in-95 duration-1000 ease-out">
                    {step === 1 && (
                        <div className="space-y-10 animate-in slide-in-from-right-8 duration-700 ease-out">
                            <div className="space-y-3">
                                <h1 className="text-5xl font-extrabold text-slate-900 font-serif leading-tight">Configura tu perfil<span className="text-blue-600">.</span></h1>
                                <p className="text-slate-400 font-medium text-lg">Necesitamos tu legajo oficial para habilitar servicios médicos.</p>
                            </div>

                            <div className="grid gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Identificación oficial (DNI / Pasaporte)</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                                            <User />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={formData.dni}
                                            onChange={(e) => setFormData({...formData, dni: e.target.value})}
                                            placeholder="Ej: 35.123.456"
                                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-50 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Domicilio Legal</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                                            <Home />
                                        </div>
                                        <input 
                                            type="text" 
                                            value={formData.address}
                                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                                            placeholder="Calle, Número, Piso/Depto"
                                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-50 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Ciudad</label>
                                        <input 
                                            type="text" 
                                            value={formData.city}
                                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                                            className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-50 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Cod. Postal</label>
                                        <input 
                                            type="text" 
                                            value={formData.postalCode}
                                            onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                                            className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-50 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleNext}
                                disabled={!formData.dni || !formData.address}
                                className="w-full py-6 luxury-gradient hover:opacity-90 disabled:bg-slate-100 disabled:from-slate-100 disabled:to-slate-100 disabled:text-slate-300 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30 transition-all active:scale-95 group"
                            >
                                Siguiente Paso
                                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-10 animate-in slide-in-from-right-8 duration-700 ease-out">
                            <div className="space-y-3">
                                <h1 className="text-5xl font-extrabold text-slate-900 font-serif leading-tight">Cobertura Médica<span className="text-teal-500">.</span></h1>
                                <p className="text-slate-400 font-medium text-lg">Sincroniza tu Obra Social para validación automática de turnos.</p>
                            </div>

                            <div className="grid gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Proveedor de Salud</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                                            <Search />
                                        </div>
                                        <select 
                                            value={formData.insuranceProviderId}
                                            onChange={(e) => setFormData({...formData, insuranceProviderId: e.target.value, insurancePlanId: ""})}
                                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-50 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold text-slate-900 appearance-none outline-none cursor-pointer"
                                        >
                                            <option value="">Buscar institución...</option>
                                            {providers?.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {formData.insuranceProviderId && (
                                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-500">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Plan contratado</label>
                                        <select 
                                            value={formData.insurancePlanId}
                                            onChange={(e) => setFormData({...formData, insurancePlanId: e.target.value})}
                                            className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-50 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold text-slate-900 appearance-none outline-none cursor-pointer"
                                        >
                                            <option value="">Selecciona tu nivel de cobertura...</option>
                                            {selectedProvider?.plans.map(plan => (
                                                <option key={plan.id} value={plan.id}>{plan.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Número de Credencial Personal</label>
                                    <div className="flex gap-4">
                                        <input 
                                            type="text" 
                                            value={formData.membershipNumber}
                                            onChange={(e) => setFormData({...formData, membershipNumber: e.target.value})}
                                            placeholder="ID de Afiliado"
                                            className="flex-1 px-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-50 focus:outline-none focus:border-blue-200 focus:bg-white transition-all font-bold text-slate-900"
                                        />
                                        <button 
                                            onClick={handleValidate}
                                            disabled={!formData.membershipNumber || isValidating || isVerified}
                                            className={`px-10 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                                                isVerified 
                                                ? 'bg-green-50 text-green-600 border border-green-100' 
                                                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200'
                                            } disabled:opacity-50`}
                                        >
                                            {isValidating ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : isVerified ? <CheckCircle2 className="h-5 w-5 mx-auto" /> : "Validar Online"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {isVerified && (
                                <div className="p-6 rounded-[2rem] bg-indigo-50/30 border border-indigo-100 flex items-center justify-between animate-in zoom-in-95 duration-700">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center border border-indigo-100 text-indigo-600 shadow-sm">
                                            <ShieldCheck className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-1">Financiador Sincronizado</p>
                                            <p className="text-sm font-extrabold text-slate-900 tracking-tighter">Token: HIS-X-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-200">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button 
                                    onClick={handleBack}
                                    className="px-8 py-6 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-3xl font-bold flex items-center justify-center transition-all"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                                <button 
                                    onClick={handleSubmit}
                                    disabled={!isVerified || isLoading}
                                    className="flex-1 py-6 luxury-gradient hover:opacity-90 disabled:bg-slate-100 disabled:from-slate-100 disabled:to-slate-100 disabled:text-slate-300 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30 transition-all active:scale-95"
                                >
                                    {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Finalizar y Acceder al Portal"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>


                <p className="mt-8 text-center text-slate-400 text-xs font-bold flex items-center justify-center gap-2">
                    <Lock className="h-3.5 w-3.5" />
                    Tus datos están protegidos por leyes de secreto médico y seguridad PHI.
                </p>
            </div>
        </div>
    );
}
