import "~/styles/globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "VitalPlus Health | Transformación Digital en Salud",
  description: "La plataforma 360 para la gestión moderna de instituciones de salud. Telemedicina, HIS y Gestión de Pacientes en un solo lugar.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar Minimalista */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <div className="h-4 w-4 bg-white rounded-sm rotate-45" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">VITALPLUS<span className="text-indigo-600">HEALTH</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#soluciones" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Soluciones</a>
            <a href="#instituciones" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Instituciones</a>
            <a href="#contacto" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Contacto</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="/admin" className="px-6 py-2.5 text-sm font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 rounded-xl transition-all">
              Acceso Clientes
            </a>
            <button className="px-6 py-2.5 text-sm font-black bg-slate-900 text-white uppercase tracking-widest rounded-xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">
              Agendar Demo
            </button>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-6 w-6 bg-indigo-600 rounded-md" />
              <span className="text-lg font-black tracking-tighter">VITALPLUS<span className="text-indigo-600">HEALTH</span></span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Redefiniendo la experiencia de salud digital mediante tecnología invisible y diseño centrado en el ser humano.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li>Portal de Pacientes</li>
              <li>Consola Médica</li>
              <li>Guardia Virtual</li>
              <li>Gestión de Sedes</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li>Privacidad</li>
              <li>Términos</li>
              <li>Seguridad HIPAA</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
