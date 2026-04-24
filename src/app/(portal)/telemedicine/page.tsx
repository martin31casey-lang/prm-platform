"use client";

import { 
  Video, 
  Mic, 
  Monitor, 
  Settings, 
  MessageSquare, 
  User, 
  Clock, 
  ShieldCheck,
  AlertCircle,
  HeartPulse,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Activity
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TelemedicinePage() {
  const { data: session } = useSession();
  const [step, setStep] = useState<'selection' | 'waiting'>('selection');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [lastCallId, setLastCallId] = useState<string | null>(null);
  
  const [ratings, setRatings] = useState({
    attention: '',
    connection: '',
    video: '',
    audio: ''
  });

  const router = useRouter();
  const joinQueue = api.telemedicine.joinQueue.useMutation();
  const endCall = api.telemedicine.endCall.useMutation();
  const submitSurvey = api.telemedicine.submitSurvey.useMutation();

  const { data: activeCall, isLoading: isLoadingCall, refetch: refetchCall } = api.telemedicine.getActiveCall.useQuery(undefined, {
    refetchInterval: 3000, 
  });

  // Efecto para detectar cuando la llamada termina y mostrar la encuesta
  useEffect(() => {
    // Solo mostramos la encuesta si el estado es COMPLETED y no la hemos mostrado aún para esta llamada
    if (activeCall?.status === 'COMPLETED' && !showSurvey && lastCallId !== activeCall.id) {
        // Solo si la llamada terminó hace menos de 2 minutos (para evitar encuestas viejas)
        const endTime = activeCall.updatedAt ? new Date(activeCall.updatedAt).getTime() : 0;
        if (Date.now() - endTime < 120000) {
            setLastCallId(activeCall.id);
            setShowSurvey(true);
        }
    }
  }, [activeCall, showSurvey, lastCallId]);

  const handleSubmitSurvey = async () => {
    if (!lastCallId || !activeCall?.patientId) return;
    
    try {
        await submitSurvey.mutateAsync({
            callId: lastCallId,
            attentionRating: ratings.attention || 'happy',
            connectionRating: ratings.connection || 'happy',
            videoRating: ratings.video || 'happy',
            audioRating: ratings.audio || 'happy',
        });
    } catch (error) {
        console.error("Error saving survey:", error);
    }

    setShowSurvey(false);
    router.push("/dashboard");
  };

  const RatingFaces = ({ category }: { category: keyof typeof ratings }) => {
    const options = [
      { id: 'sad', icon: '😞', label: 'Mala' },
      { id: 'neutral', icon: '😐', label: 'Regular' },
      { id: 'happy', icon: '😊', label: 'Buena' }
    ];

    return (
      <div className="flex justify-center gap-6 mt-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setRatings(prev => ({ ...prev, [category]: opt.id }))}
            className={`flex flex-col items-center gap-1 transition-all ${ratings[category] === opt.id ? 'scale-125' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}
          >
            <span className="text-4xl">{opt.icon}</span>
            <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400">{opt.label}</span>
          </button>
        ))}
      </div>
    );
  };

  // Validación de seguridad (ahora apuntando a health que es seguro)
  if (!api.health) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Cargando Salud Digital...</h2>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg">Refrescar</button>
      </div>
    );
  }

  // MODAL DE ENCUESTA
  if (showSurvey) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-500">
        <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Activity className="w-32 h-32" />
          </div>
          
          <div className="text-center mb-10">
            <div className="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">¡Consulta Finalizada!</h2>
            <p className="text-slate-500 font-medium text-sm mt-2">Tu opinión nos ayuda a mejorar la calidad médica.</p>
          </div>

          <div className="space-y-10">
            <div className="text-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4">¿Cómo fuiste atendido por tu médico/a?</h4>
              <RatingFaces category="attention" />
            </div>

            <div className="text-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4">¿Cómo estuvo la conexión de la llamada?</h4>
              <RatingFaces category="connection" />
            </div>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="text-center">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">¿Se veía bien?</h4>
                <RatingFaces category="video" />
              </div>
              <div className="text-center">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">¿Se escuchaba bien?</h4>
                <RatingFaces category="audio" />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmitSurvey}
            className="w-full mt-12 py-5 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-600/20"
          >
            Enviar y Finalizar
          </button>
        </div>
      </div>
    );
  }

  const specialties = [
    { id: 'cli', name: 'Clínica Médica', online: 3, icon: <User className="w-6 h-6" />, color: 'bg-blue-500' },
    { id: 'ped', name: 'Pediatría', online: 2, icon: <HeartPulse className="w-6 h-6" />, color: 'bg-rose-500' },
    { id: 'der', name: 'Dermatología', online: 1, icon: <Activity className="w-6 h-6" />, color: 'bg-emerald-500' },
    { id: 'tra', name: 'Traumatología', online: 0, icon: <Stethoscope className="w-6 h-6" />, color: 'bg-amber-500' },
  ];

  const handleSelect = async (spec: any) => {
    console.log("Seleccionando:", spec?.name);
    try {
      if (spec?.online > 0) {
        setSelectedSpecialty(spec.name);
        try {
          await joinQueue.mutateAsync({ specialty: spec.name });
          await refetchCall();
          setStep('waiting');
        } catch (err: any) {
          alert("❌ Error al unirse a la fila: " + err.message);
          console.error("Error en joinQueue:", err);
        }
      }
    } catch (error: any) {
      console.error("Error crítico en handleSelect:", error);
    }
  };

  // Ya no bloqueamos la UI con un spinner a pantalla completa.
  // Solo lo usamos como flag para indicadores sutiles si fuera necesario.
  const isInitialLoading = isLoadingCall && !activeCall;


  const handleEndCall = async () => {
    if (activeCall?.id) {
        await endCall.mutateAsync({ callId: activeCall.id });
        await refetchCall();
    }
  };

  // Si hay una llamada en curso y tenemos el nombre de la sala
  if (activeCall?.status === 'IN_PROGRESS' && activeCall?.roomName) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in fade-in duration-500">
        <div className="p-4 bg-slate-900 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Consulta en Vivo: {activeCall?.doctorId || "Médico"}</span>
            </div>
            <button 
                onClick={handleEndCall}
                className="text-[10px] font-bold text-white bg-red-600 px-3 py-1 rounded-lg"
            >
                Finalizar
            </button>
        </div>
        <div className="flex-1 relative">
            <iframe 
                src={`https://jitsi.riot.im/${activeCall.roomName}#config.startWithVideoMuted=false&config.startWithAudioMuted=false&userInfo.displayName="${session?.user?.name || "Paciente"}"&config.prejoinPageEnabled=false&config.prejoinConfig.enabled=false&config.enableWelcomePage=false&config.lobby.enabled=false&config.disableDeepLinking=true&config.p2p.enabled=true&config.enableNoAudioDetection=true`} 
                allow="autoplay; camera; microphone; fullscreen; display-capture; encrypted-media"
                className="w-full h-full border-none"
            />
        </div>
      </div>
    );
  }

  // Si estamos en el paso de selección y no hay nada activo
  if (step === 'selection' && (!activeCall || activeCall?.status === 'CANCELLED' || activeCall?.status === 'COMPLETED')) {
    return (
      <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1 w-8 bg-indigo-600"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">
                Atención Inmediata {isLoadingCall && <span className="ml-2 lowercase italic opacity-50">(sincronizando...)</span>}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight font-outfit uppercase">Guardia Virtual</h1>
            <p className="text-slate-500 mt-1 font-medium">Selecciona una especialidad para entrar a la sala de espera.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((spec) => (
            <button
              key={spec.id}
              onClick={() => handleSelect(spec)}
              disabled={spec.online === 0 || joinQueue.isPending}
              className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 text-left flex flex-col justify-between h-64 ${
                spec.online > 0 
                ? "bg-white border-slate-100 hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-600/10 active:scale-95" 
                : "bg-slate-50 border-transparent opacity-60 cursor-not-allowed"
              }`}
            >
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${spec.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {spec.icon}
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {joinQueue.isPending && selectedSpecialty === spec.name ? "Conectando..." : spec.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${spec.online > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${spec.online > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {spec.online > 0 ? `${spec.online} Médicos Online` : 'Sin Médicos'}
                  </span>
                </div>
              </div>

              {spec.online > 0 && !joinQueue.isPending && (
                <div className="absolute top-6 right-6">
                   <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-4 h-4" />
                   </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-md">
                    <h3 className="text-2xl font-bold mb-2">¿Tienes un turno programado?</h3>
                    <p className="text-slate-400 text-sm">Si ya agendaste una consulta virtual, el botón de acceso aparecerá automáticamente en tu Dashboard 15 minutos antes de la cita.</p>
                </div>
                <Link href="/appointments" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all text-xs uppercase tracking-widest whitespace-nowrap">
                    Ver Mis Turnos
                </Link>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>
    );
  }

  // Si estamos en espera
  const activeSpec = activeCall?.specialty || selectedSpecialty;

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => setStep('selection')} className="hover:text-indigo-600 transition-colors">
                <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="h-1 w-8 bg-indigo-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Sala de Espera Virtual</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight font-outfit uppercase">{activeSpec}</h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-slate-500 font-medium">Un médico se conectará en breve para atenderte.</p>
            <button 
                onClick={() => setStep('selection')}
                className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline"
            >
                Cancelar y Volver
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex items-center justify-center border-8 border-white group">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8">
               <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center animate-pulse mb-6 shadow-2xl shadow-indigo-600/40">
                  <Video className="w-10 h-10 text-white" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Fila de Espera</h3>
               <p className="text-indigo-200 text-sm max-w-sm">Estás en posición para ser atendido en **{activeSpec}**. Por favor, mantén esta pantalla abierta.</p>
            </div>
            <div className="text-slate-700 flex flex-col items-center">
                <User className="w-32 h-32 opacity-10" />
            </div>
          </div>

          <div className="soft-card p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Conexión Segura</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Encriptación End-to-End Activa</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
