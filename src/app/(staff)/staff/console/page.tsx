"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { api } from "~/trpc/react";
import { 
  User, 
  Video, 
  Clock,
  Activity,
  Stethoscope,
  ChevronRight
} from "lucide-react";

export default function StaffConsolePage() {
  const { data: queue, refetch: refetchQueue } = api.health.getWaitingQueue.useQuery(undefined, {
    refetchInterval: 5000, 
  });

  // Query para ver si el médico tiene una llamada colgada/activa
  const { data: resumedCall, refetch: refetchActiveCall } = api.health.getDoctorActiveCall.useQuery(
    { doctorName: "Dr. Alejandro Sanz" },
    { staleTime: 0 }
  );

  const acceptCall = api.health.acceptCall.useMutation();
  const endCall = api.health.endCall.useMutation();
  
  const [activeCall, setActiveCall] = useState<any>(null);
  const [jitsiLoaded, setJitsiLoaded] = useState(false);

  // Efecto para recuperar llamada activa al cargar/refrescar
  useEffect(() => {
    if (resumedCall && !activeCall) {
      setActiveCall(resumedCall);
    }
  }, [resumedCall]);

  const handleAccept = async (callId: string) => {
    const res = await acceptCall.mutateAsync({ 
      callId, 
      doctorName: "Dr. Alejandro Sanz" 
    });
    setActiveCall(res);
  };

  const handleEnd = async () => {
    if (activeCall) {
      await endCall.mutateAsync({ callId: activeCall.id });
      setActiveCall(null);
      await Promise.all([
        refetchQueue(),
        refetchActiveCall()
      ]);
    }
  };

  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCall && jitsiContainerRef.current && typeof window !== "undefined") {
      // @ts-ignore
      if (!window.JitsiMeetExternalAPI) {
        console.warn("Jitsi API not loaded yet, waiting...");
        return;
      }

      // @ts-ignore
      const domain = "jitsi.riot.im";
      const options = {
        roomName: activeCall.roomName,
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: 'Dr. Alejandro Sanz'
        },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
          prejoinConfig: { enabled: false },
          disableDeepLinking: true,
          p2p: { enabled: true },
          enableWelcomePage: false,
          lobby: { enabled: false },
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'chat',
            'settings', 'videoquality', 'filmstrip', 'tileview',
          ],
          SETTINGS_SECTIONS: [ 'devices', 'language', 'profile' ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        }
      };
      
      try {
        // @ts-ignore
        const apiInstance = new window.JitsiMeetExternalAPI(domain, options);
        return () => apiInstance.dispose();
      } catch (error) {
        console.error("Error initializing Jitsi:", error);
      }
    }
  }, [activeCall, jitsiLoaded]);

  // Si hay una llamada activa, mostramos la interfaz de telemedicina
  if (activeCall) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col overflow-hidden">
        <Script 
          src="https://meet.jit.si/external_api.js" 
          onLoad={() => setJitsiLoaded(true)}
        />
        {/* Header de Telemedicina */}
        <div className="p-4 bg-slate-900 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Video className="text-white w-5 h-5" />
            </div>
            <div>
                <h1 className="text-white font-black text-[10px] uppercase tracking-[0.2em]">Consulta en Vivo</h1>
                <p className="text-indigo-400 text-xs font-bold">Paciente: {activeCall.patient?.user?.name || "En espera..."}</p>
            </div>
          </div>
          <button 
            onClick={handleEnd}
            className="px-6 py-2.5 bg-red-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20"
          >
            Finalizar Atención
          </button>
        </div>

        {/* Video Full */}
        <div className="flex-1 bg-black relative" ref={jitsiContainerRef}>
           {/* Jitsi API */}
        </div>
      </div>
    );
  }

  // Interfaz de Sala de Guardia (Default)
  return (
    <div className="space-y-10">
      <Script 
        src="https://meet.jit.si/external_api.js" 
        onLoad={() => setJitsiLoaded(true)}
      />
      <div className="flex items-center justify-between">
          <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic font-heading">
                Sala de Guardia <span className="text-indigo-600">Virtual</span>
              </h1>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Monitoreo de fila en tiempo real</p>
          </div>
          <div className="flex items-center gap-4">
              <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Servicio Operativo</span>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pacientes en Espera ({queue?.length || 0})</h3>
                <button onClick={() => refetchQueue()} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Refrescar</button>
              </div>
              
              {queue?.length === 0 ? (
                  <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center">
                      <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                          <Activity className="w-10 h-10 text-slate-200" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Tranquilidad Total</h4>
                      <p className="text-slate-400 text-sm max-w-xs">No hay pacientes esperando atención en este momento.</p>
                  </div>
              ) : (
                  <div className="space-y-4">
                      {queue?.map((call) => (
                          <div key={call.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-indigo-600 transition-all">
                              <div className="flex items-center gap-5">
                                  <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
                                      {call.patient.user.image ? (
                                        <img src={call.patient.user.image} alt="patient" className="h-full w-full object-cover" />
                                      ) : (
                                        <div className="h-full w-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl uppercase">
                                          {call.patient.user.name?.charAt(0) || "P"}
                                        </div>
                                      )}
                                  </div>
                                  <div>
                                      <h4 className="text-base font-bold text-slate-900">{call.patient.user.name || "Paciente Anónimo"}</h4>
                                      <div className="flex items-center gap-3 mt-1">
                                          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest px-2 py-0.5 bg-indigo-50 rounded">
                                              {call.specialty}
                                          </span>
                                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                              <Clock className="w-3 h-3" /> Espera: {Math.floor((Date.now() - new Date(call.createdAt).getTime()) / 60000)} min
                                          </span>
                                      </div>
                                  </div>
                              </div>
                              <button 
                                  onClick={() => handleAccept(call.id)}
                                  className="px-6 py-3 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 group"
                              >
                                  Atender <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </button>
                          </div>
                      ))}
                  </div>
              )}
          </div>

          <div className="space-y-6">
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Activity className="w-20 h-20" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Métricas de Hoy</h4>
                  <div className="space-y-6">
                      <div>
                          <div className="text-3xl font-black italic">12</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pacientes Atendidos</div>
                      </div>
                      <div>
                          <div className="text-3xl font-black italic text-emerald-400">4.2m</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Espera Promedio</div>
                      </div>
                  </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                      <div className="h-8 w-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <Stethoscope className="text-indigo-600 w-4 h-4" />
                      </div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Historial Reciente</h4>
                  </div>
                  <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-slate-50 last:border-0">
                            <span className="font-bold text-slate-600">Paciente #{1240 + i}</span>
                            <span className="text-slate-400 font-medium">14:2{i} hs</span>
                        </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
