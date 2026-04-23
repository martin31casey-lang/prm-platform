"use client";

import { useState } from "react";
import { 
    Card, 
    CardContent 
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
    Pill, 
    Calendar, 
    Download, 
    QrCode,
    Search,
    AlertCircle,
    CheckCircle2,
    UserCircle
} from "lucide-react";

export default function PrescriptionsPage() {
    const [search, setSearch] = useState("");
    
    // Mock de recetas para el prototipo
    const prescriptions = [
        {
            id: "RX-90210",
            medication: "Amoxicilina 500mg",
            instructions: "1 comprimido cada 8 horas por 7 días",
            prescribedBy: "Dra. Valeria Sánchez",
            date: "10 Abr 2026",
            expires: "10 May 2026",
            status: "active",
            pharmacyNotes: "Presentar receta digital en farmacia vinculada."
        },
        {
            id: "RX-88432",
            medication: "Ibuprofeno 600mg",
            instructions: "1 comprimido cada 12 horas si presenta dolor",
            prescribedBy: "Dr. Roberto Gómez",
            date: "15 Mar 2026",
            expires: "15 Abr 2026",
            status: "expired",
            pharmacyNotes: "Vencida el 15/04/2026"
        }
    ];

    return (
        <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-700 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-950 uppercase italic">Recetas Digitales</h2>
                    <p className="text-slate-500 mt-2 font-bold text-sm">Gestiona tus prescripciones vigentes con validación institucional.</p>
                </div>
                <div className="flex items-center gap-3 bg-white border-2 border-slate-950 rounded-2xl px-5 py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <Search className="h-5 w-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Buscar medicamento o doctor..." 
                        className="bg-transparent border-none outline-none text-sm text-slate-900 w-64 placeholder:text-slate-300 font-bold"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-8">
                {prescriptions.map((rx) => (
                    <Card key={rx.id} className={`bg-white border-none shadow-xl shadow-slate-200/50 group relative overflow-hidden rounded-[2.5rem] transition-all hover:-translate-y-1 ${rx.status === 'expired' ? 'opacity-80 grayscale-[0.5]' : ''}`}>
                        <CardContent className="p-10">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                                <div className="flex items-start gap-8">
                                    <div className={`h-20 w-20 rounded-[1.8rem] flex items-center justify-center border-2 ${
                                        rx.status === 'active' 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-xl shadow-emerald-500/10' 
                                            : 'bg-slate-50 text-slate-400 border-slate-100'
                                    }`}>
                                        <Pill className="h-10 w-10" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4">
                                            <h3 className="font-black text-3xl text-slate-950 tracking-tighter uppercase">{rx.medication}</h3>
                                            <Badge className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                                                rx.status === 'active' 
                                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/30' 
                                                : 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/30'
                                            }`}>
                                                {rx.status === 'active' ? 'Vigente' : 'Vencida'}
                                            </Badge>
                                        </div>
                                        <p className="text-blue-600 font-black text-lg max-w-xl leading-tight">{rx.instructions}</p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Prescrito</span>
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                                    <Calendar className="h-4 w-4 text-slate-400" />
                                                    {rx.date}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Vencimiento</span>
                                                <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                                                    <AlertCircle className={`h-4 w-4 ${rx.status === 'active' ? 'text-emerald-500' : 'text-rose-500'}`} />
                                                    {rx.expires}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Profesional</span>
                                                <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                                    <UserCircle className="h-4 w-4 text-slate-400" />
                                                    {rx.prescribedBy}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:flex-col gap-4">
                                    <button className="flex-1 lg:w-44 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95">
                                        <QrCode className="h-5 w-5" />
                                        Token Farmacia
                                    </button>
                                    <button className="flex-1 lg:w-44 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 transition-all text-[10px] font-black uppercase tracking-widest border-2 border-slate-950 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]">
                                        <Download className="h-5 w-5" />
                                        Descargar PDF
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-3 text-[11px] font-bold text-slate-400 italic">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span>{rx.pharmacyNotes}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="p-10 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6 text-center md:text-left">
                        <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <AlertCircle className="h-8 w-8 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-black text-2xl uppercase italic tracking-tighter">¿Necesitas renovar una receta?</h4>
                            <p className="text-slate-400 font-medium">Solicita una teleconsulta inmediata con tu médico de cabecera.</p>
                        </div>
                    </div>
                    <button className="w-full md:w-auto px-10 py-5 bg-white text-slate-950 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all shadow-2xl shadow-white/10 active:scale-95">
                        Solicitar Renovación
                    </button>
                </div>
            </div>
        </div>
    );
}
