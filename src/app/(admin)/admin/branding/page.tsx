import { 
  Palette, 
  Upload, 
  CheckCircle,
  Eye,
  RefreshCw
} from "lucide-react";

export default function BrandingPage() {
  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Marca Blanca</h1>
        <p className="text-slate-500 font-medium">Personalice la identidad visual de su institución.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
            {/* Logo Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold">
                <Upload className="w-5 h-5 text-indigo-600" />
                Logo Institucional
              </div>
              <div className="flex items-center gap-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="h-24 w-24 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-300">
                  <Palette className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">
                    Cambiar Imagen
                  </button>
                  <p className="text-[10px] text-slate-400 font-medium">SVG, PNG o JPG. Máximo 2MB.</p>
                </div>
              </div>
            </div>

            {/* Colors Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold">
                <Palette className="w-5 h-5 text-indigo-600" />
                Colores de Marca
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Color Primario</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 border border-white" />
                    <input type="text" defaultValue="#4f46e5" className="bg-transparent border-none text-sm font-bold text-slate-600 focus:ring-0" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Color Secundario</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="h-8 w-8 rounded-lg bg-slate-900 border border-white" />
                    <input type="text" defaultValue="#0f172a" className="bg-transparent border-none text-sm font-bold text-slate-600 focus:ring-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Domain Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900 font-bold">
                <Eye className="w-5 h-5 text-indigo-600" />
                Dominio Personalizado
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-sm font-bold text-slate-400">https://</span>
                  <input type="text" placeholder="ej: portal.miclinica.com" className="flex-1 bg-transparent border-none text-sm font-bold text-slate-900 focus:ring-0" />
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Requiere configuración de registros CNAME en su proveedor de dominio.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
               <button className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-600/20">
                  Guardar y Aplicar Cambios
               </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden h-[500px]">
             <div className="absolute top-0 right-0 p-8">
                <RefreshCw className="w-5 h-5 text-white/20 animate-spin-slow" />
             </div>
             <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8">Vista Previa Real-Time</h3>
                
                <div className="flex-1 bg-white rounded-3xl p-6 text-slate-900 space-y-6 shadow-2xl">
                   {/* Mock App UI */}
                   <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="h-6 w-20 bg-indigo-600 rounded-lg" />
                      <div className="h-8 w-8 bg-slate-100 rounded-full" />
                   </div>
                   <div className="space-y-3">
                      <div className="h-4 w-3/4 bg-slate-100 rounded-full" />
                      <div className="h-32 w-full bg-slate-50 rounded-2xl flex items-center justify-center">
                         <div className="h-10 w-10 bg-indigo-100 rounded-full" />
                      </div>
                   </div>
                   <div className="h-10 w-full bg-indigo-600 rounded-xl" />
                </div>

                <div className="mt-8 text-center">
                   <p className="text-xs text-indigo-300 font-medium italic">
                     Así es como sus pacientes verán <br /> su portal institucional.
                   </p>
                </div>
             </div>
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
