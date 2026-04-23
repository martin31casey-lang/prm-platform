"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { 
    Calendar, 
    Clock, 
    MapPin, 
    User,
    Loader2,
    CalendarPlus,
    Video
} from "lucide-react";
import { format, differenceInMinutes, isBefore, isAfter, addMinutes } from "date-fns";
import { es } from "date-fns/locale";
import { NewAppointmentFlow } from "./_components/NewAppointmentFlow";

export default function AppointmentsPage() {
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const { data: appointments, isLoading } = api.health.getAppointments.useQuery();
    const [currentTime, setCurrentTime] = useState(new Date());

    // Actualizar el reloj para la lógica de los 15 minutos
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in slide-in-from-right-2 duration-700">
            <NewAppointmentFlow 
                isOpen={isRequestModalOpen} 
                onClose={() => setIsRequestModalOpen(false)} 
            />
            
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">Mis Turnos</h2>
                    <p className="text-slate-500 mt-1 font-bold text-sm">Gestiona tus citas médicas y consulta historial.</p>
                </div>
                <button 
                    onClick={() => setIsRequestModalOpen(true)}
                    className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all shadow-2xl shadow-slate-900/10 active:scale-95"
                >
                    <CalendarPlus className="h-4 w-4" />
                    Solicitar Nuevo Turno
                </button>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="border-slate-100 hover:bg-transparent">
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-5 pl-8">Fecha y Hora</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipo / Especialidad</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Profesional</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Centro / Consultorio</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400 pr-8 text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments?.map((apt, index) => {
                            // LÓGICA DE FLUJO B: Simular que algunos turnos son virtuales
                            const isVirtual = index === 0; // El primer turno es virtual para demo
                            const aptDate = new Date(apt.start);
                            const minutesDiff = differenceInMinutes(aptDate, currentTime);
                            const canJoin = isVirtual && minutesDiff <= 15 && minutesDiff >= -30; // 15 min antes hasta 30 después

                            return (
                                <TableRow key={apt.id} className="border-slate-50 hover:bg-blue-50/30 transition-colors group">
                                    <TableCell className="py-6 pl-8">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900">
                                                {format(aptDate, "d 'de' MMMM", { locale: es })}
                                            </span>
                                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-medium">
                                                <Clock className="h-3 w-3" />
                                                {format(aptDate, "hh:mm aa")}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-700">{apt.professional.specialty}</span>
                                            {isVirtual ? (
                                                <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1">
                                                    <Video className="w-3 h-3" /> Medicina Virtual
                                                </span>
                                            ) : (
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Presencial</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                                                 <img src={`https://i.pravatar.cc/100?u=${apt.id}`} alt="doc" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{apt.professional.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                            <MapPin className="h-3.5 w-3.5 text-blue-500/40" />
                                            <span>{isVirtual ? 'Consultorio Virtual' : apt.facility.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="pr-8 text-right">
                                        {canJoin ? (
                                            <Link 
                                                href="/telemedicine"
                                                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 animate-bounce"
                                            >
                                                <Video className="w-3 h-3" /> Ingresar a Sala
                                            </Link>
                                        ) : (
                                            <Badge className={`
                                                ${apt.status === 'confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100' : ''}
                                                ${apt.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : ''}
                                                ${apt.status === 'cancelled' ? 'bg-slate-100 text-slate-400 border-slate-200' : ''}
                                                rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter border
                                             shadow-none`}>
                                                {apt.status}
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                    <Calendar className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium pt-1">
                    <span className="font-bold text-blue-600 uppercase tracking-widest text-[10px] block mb-1">Información importante</span>
                    Recuerda presentarte 15 minutos antes de tu cita con tu credencial y documento. Los turnos cancelados con menos de 24hs podrían estar sujetos a re-agenda administrativa.
                </p>
            </div>
        </div>
    );
}

