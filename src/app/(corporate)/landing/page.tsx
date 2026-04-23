import { 
  ShieldCheck, 
  Activity, 
  Users, 
  Video, 
  LayoutDashboard, 
  Smartphone,
  ArrowRight,
  Globe,
  Database,
  Lock,
  CheckCircle
} from "lucide-react";

export default function CorporateLandingPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Nueva Era en Salud Digital</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 font-heading italic uppercase">
            Transforma La <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Atención Digital</span> de Tus Pacientes
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed mb-12">
            VitalPlus Health es el aliado estratégico que potencia la gestión médica y la telemedicina en una plataforma ultra-rápida, segura y diseñada para escalar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-black rounded-[1.5rem] text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-600/20 flex items-center justify-center gap-3 group">
              Empezar Ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-black rounded-[1.5rem] text-sm uppercase tracking-widest border border-slate-200 hover:border-indigo-600 transition-all">
              Ver Demo
            </button>
          </div>
        </div>

        {/* Floating Dashboard Preview */}
        <div className="max-w-5xl mx-auto mt-24 relative">
          <div className="aspect-video bg-white rounded-[3rem] border border-slate-200 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden animate-float">
             <img 
               src="/images/corporate/hero-dashboard.png" 
               alt="VitalPlus Dashboard" 
               className="w-full h-full object-cover"
             />
          </div>
          {/* Decorative Orbs */}
          <div className="absolute -top-10 -right-10 h-40 w-40 bg-indigo-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-black mb-2 tracking-tighter">99.9%</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Disponibilidad</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2 tracking-tighter">+500k</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Pacientes Atendidos</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2 tracking-tighter">&lt;2min</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tiempo de Respuesta</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2 tracking-tighter">AES-256</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Encriptación de Datos</div>
          </div>
        </div>
      </section>

      {/* Detailed Solutions Section */}
      <section id="soluciones" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="h-1 w-20 bg-indigo-600 mb-6"></div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter italic uppercase font-heading leading-none">
                Ecosistema <br />
                <span className="text-indigo-600">Digital Integral</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium max-w-sm text-lg leading-relaxed">
              No son herramientas aisladas. Es una red inteligente de datos que fluye entre pacientes, médicos y administración.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-20">
            {/* Solution 1: Patient Experience */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
                   <Smartphone className="w-4 h-4" /> Experiencia del Paciente
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Portal de Autogestión 360</h3>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                  Empodere a sus pacientes con una PWA (Progressive Web App) que no requiere descarga. Gestión de turnos, acceso a historia clínica y resultados en una interfaz fluida.
                </p>
                <ul className="space-y-4">
                  {[
                    "Reserva de turnos en tiempo real con integración HIS.",
                    "Visualización de estudios y diagnósticos por imágenes.",
                    "Recordatorios automáticos vía WhatsApp/Push.",
                    "Fila de espera virtual para urgencias menores."
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                      <CheckCircle className="w-5 h-5 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 bg-slate-100 rounded-[3rem] aspect-square flex items-center justify-center p-8 border border-slate-200 overflow-hidden group">
                 <img 
                   src="/images/corporate/patient-app.png" 
                   alt="VitalPlus Patient App" 
                   className="w-full h-full object-cover rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                 />
              </div>
            </div>

            {/* Solution 2: Medical Power */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="bg-slate-100 rounded-[3rem] aspect-square flex items-center justify-center p-8 border border-slate-200 overflow-hidden group">
                 <img 
                   src="/images/corporate/medical-console.png" 
                   alt="VitalPlus Medical Console" 
                   className="w-full h-full object-cover rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                 />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
                   <Activity className="w-4 h-4" /> Eficiencia Médica
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Consola de Atención Unificada</h3>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                  Diseñada por médicos para médicos. Una interfaz limpia que reduce el tiempo de carga de datos y permite enfocarse en el paciente.
                </p>
                <ul className="space-y-4">
                  {[
                    "Telemedicina integrada sin aplicaciones externas.",
                    "Evolución clínica estructurada y receta digital.",
                    "Acceso instantáneo a antecedentes y laboratorios.",
                    "Gestión inteligente de agendas y sobreturnos."
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                      <CheckCircle className="w-5 h-5 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Solution 3: Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6">
                   <Users className="w-4 h-4" /> Inteligencia Institucional
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">Administración & BI</h3>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                  Tome decisiones basadas en datos reales. Monitoree el rendimiento de sus sedes y el nivel de satisfacción de sus pacientes en tiempo real.
                </p>
                <ul className="space-y-4">
                  {[
                    "Panel Multi-sede centralizado.",
                    "Métricas de ocupación y tiempos de espera.",
                    "Gestión de noticias y comunicaciones institucionales.",
                    "Control total de la marca blanca y configuración."
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                      <CheckCircle className="w-5 h-5 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 bg-slate-100 rounded-[3rem] aspect-square flex items-center justify-center p-8 border border-slate-200 overflow-hidden group">
                 <img 
                   src="/images/corporate/bi-dashboard.png" 
                   alt="VitalPlus BI Dashboard" 
                   className="w-full h-full object-cover rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Access CTA */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-12 md:p-24 border border-slate-200 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 p-8">
                <Lock className="w-24 h-24 text-slate-50" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 italic uppercase font-heading">Plataforma de Clientes</h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
              Gestione su institución, configure sedes, administre profesionales y analice el rendimiento de su guardia desde una sola consola.
            </p>
            <button className="px-12 py-5 bg-indigo-600 text-white font-black rounded-[1.5rem] text-sm uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-600/20">
                Ingresar al Portal Institucional
            </button>
        </div>
      </section>
    </div>
  );
}
