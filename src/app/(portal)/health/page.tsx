"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
    FileText, 
    FlaskConical, 
    Activity, 
    Download, 
    ExternalLink,
    Search,
    Loader2,
    Calendar
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Health360Page() {
    const [selectedType, setSelectedType] = useState<'ALL' | 'LAB' | 'IMG'>('ALL');
    const [days, setDays] = useState<number | undefined>(30);

    const { data: studies, isLoading } = api.health.getMedicalHistory.useQuery({
        type: selectedType === 'ALL' ? undefined : selectedType,
        days: days
    });

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-900" />
            </div>
        );
    }

    // Limitamos a 5 resultados para no saturar la vista si no hay filtros activos
    const displayStudies = studies?.slice(0, 5) ?? [];

    return (
        <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900">Historia 360</h2>
                    <p className="text-slate-500 mt-2 font-medium">Historial clínico digital integrado con el HIS institucional.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 bg-slate-100/50 p-1.5 rounded-[1.5rem] border border-slate-200/60">
                    <button 
                        onClick={() => setSelectedType('ALL')}
                        className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedType === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Todos
                    </button>
                    <button 
                        onClick={() => setSelectedType('LAB')}
                        className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedType === 'LAB' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Laboratorio
                    </button>
                    <button 
                        onClick={() => setSelectedType('IMG')}
                        className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedType === 'IMG' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Imágenes
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between py-4 border-y border-slate-100">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mostrar:</span>
                    <div className="flex items-center gap-1">
                        <button 
                            onClick={() => setDays(30)}
                            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${days === 30 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}
                        >
                            30 Días
                        </button>
                        <button 
                            onClick={() => setDays(undefined)}
                            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${days === undefined ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}
                        >
                            Ver Todo
                        </button>
                    </div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                    {displayStudies.length} {displayStudies.length === 1 ? 'Estudio encontrado' : 'Estudios encontrados'}
                </div>
            </div>

            <div className="grid gap-6">
                {displayStudies.map((study) => (
                    <Card key={study.id} className="bg-white border-slate-100 hover:border-blue-200 transition-all group rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50">
                        <CardContent className="p-8">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-6">
                                    <div className={`mt-1 h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner ${
                                        study.modality === 'LAB' 
                                            ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                                            : 'bg-blue-50 text-blue-600 border border-blue-100'
                                    }`}>
                                        {study.modality === 'LAB' ? <FlaskConical className="h-7 w-7" /> : <Activity className="h-7 w-7" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-xl text-slate-900">{study.description}</h3>
                                            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest bg-slate-50 border-slate-200 text-slate-400">
                                                {study.modality}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                                            <span className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-slate-300" />
                                                ID: {study.externalId}
                                            </span>
                                            <span className="text-slate-200">•</span>
                                            <span className="flex items-center gap-2 italic">
                                                <Calendar className="h-4 w-4 text-slate-300" />
                                                {format(new Date(study.date), "PPP", { locale: es })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {study.reportUrl && (
                                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all border border-slate-100" title="Descargar Informe">
                                            <Download className="h-5 w-5" />
                                        </button>
                                    )}
                                    {study.pacsLink && (
                                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                                            <ExternalLink className="h-4 w-4" />
                                            Ver Imágenes
                                        </button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {(!studies || studies.length === 0) && (
                    <div className="h-64 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
                        <FileText className="h-12 w-12 text-slate-200 mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Sin registros encontrados</p>
                    </div>
                )}
            </div>
        </div>
    );
}

