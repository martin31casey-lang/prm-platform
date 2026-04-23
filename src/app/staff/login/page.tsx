"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { HeartPulse, ArrowLeft, ShieldCheck, Lock, User, Stethoscope, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StaffLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales de profesional incorrectas");
      } else {
        router.push("/staff/console");
      }
    } catch (err) {
      setError("Error de conexión con el portal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Estética Médica Professional (Dark Theme) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
      
      <div className="relative w-full max-w-md animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-[3rem] shadow-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
          
          {/* Logo y Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/30 mb-6">
              <Stethoscope className="h-9 w-9 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter leading-tight uppercase">
              Bienvenido al Portal de Staff <br/>
              <span className="text-indigo-400 font-heading italic">Profesional de la Salud</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-6">Institución: <span className="text-indigo-400">Quantum</span></p>
          </div>

          <form onSubmit={handleStaffLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest p-4 rounded-xl text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Usuario Profesional</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-sm font-bold text-white focus:bg-slate-900 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                  placeholder="ej: msmith"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-sm font-bold text-white focus:bg-slate-900 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-white text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-indigo-500 hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "INGRESAR A CONSOLA MÉDICA"
                )}
              </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-8 text-slate-500">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Acceso Cifrado</span>
                </div>
                <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Sesión Protegida</span>
                </div>
            </div>

            <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                <ArrowLeft className="h-4 w-4" />
                Volver al Sitio Principal
            </Link>
        </div>
      </div>
    </main>
  );
}
