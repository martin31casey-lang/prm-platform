"use client";

import React, { useState, useEffect } from "react";
import { 
    Search, 
    Filter, 
    X, 
    Check, 
    Calendar, 
    Clock, 
    MapPin, 
    ChevronRight, 
    Stethoscope, 
    User,
    ArrowRight,
    Loader2,
    CalendarCheck2
} from "lucide-react";
import { PLATFORM_CONFIG } from "~/config/platform";
import { format, addDays, setHours, setMinutes } from "date-fns";
import { es } from "date-fns/locale";

const SPECIALTIES = [
  "Cardiología",
  "Dermatología",
  "Ginecología",
  "Pediatría",
  "Traumatología",
  "Clínica Médica"
];

const CENTER_SPECIALTIES: Record<string, string[]> = {
  "sede-central": ["Cardiología", "Dermatología", "Ginecología", "Pediatría", "Traumatología", "Clínica Médica"],
  "sede-belgrano": ["Dermatología", "Ginecología", "Clínica Médica"],
  "sede-pilar": ["Pediatría", "Traumatología", "Clínica Médica"]
};

const MOCK_DOCTORS = [
    { id: 1, name: "Dr. Alejandro Sanz", specialty: "Cardiología" },
    { id: 2, name: "Dra. Elena García", specialty: "Dermatología" },
    { id: 3, name: "Dr. Roberto Gómez", specialty: "Pediatría" },
];

export function NewAppointmentFlow({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [mode, setMode] = useState<"quick" | "filtered">("quick");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedCenters, setSelectedCenters] = useState<string[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    // Reset when changing mode
    useEffect(() => {
        setResults([]);
        setSearchTerm("");
        setSelectedSpecialty("");
        setSelectedCenters([]);
    }, [mode]);

    const handleQuickSearch = () => {
        setIsSearching(true);
        // Mock search logic
        setTimeout(() => {
            setResults([
                {
                    id: "t1",
                    date: addDays(new Date(), 2),
                    professional: MOCK_DOCTORS[0],
                    center: PLATFORM_CONFIG.centers[0],
                },
                {
                    id: "t2",
                    date: addDays(new Date(), 3),
                    professional: MOCK_DOCTORS[1],
                    center: PLATFORM_CONFIG.centers[1],
                }
            ]);
            setIsSearching(false);
        }, 800);
    };

    const handleFilteredSearch = () => {
        setIsSearching(true);
        setTimeout(() => {
            setResults([
                {
                    id: "t3",
                    date: addDays(new Date(), 1),
                    professional: MOCK_DOCTORS[2],
                    center: PLATFORM_CONFIG.centers.find(c => selectedCenters.includes(c.id)) || PLATFORM_CONFIG.centers[0],
                }
            ]);
            setIsSearching(false);
        }, 1200);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedSpecialty("");
        setSelectedCenters([]);
        setResults([]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-500">
                {/* Header */}
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div>
                        <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter">Solicitar Nuevo Turno</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Sincronización directa con HIS</p>
                    </div>
                    <button onClick={onClose} className="h-10 w-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                        <X className="h-5 w-5 text-slate-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
                    {/* Mode Selector */}
                    <div className="flex p-1 bg-slate-100 rounded-2xl w-fit">
                        <button 
                            onClick={() => setMode("quick")}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "quick" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            Búsqueda Rápida
                        </button>
                        <button 
                            onClick={() => setMode("filtered")}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "filtered" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            Filtros Avanzados
                        </button>
                    </div>

                    {/* Mode Content */}
                    <div className="grid lg:grid-cols-12 gap-10">
                        {/* Filters Column */}
                        <div className="lg:col-span-5 space-y-6">
                            {mode === "quick" ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Especialidad, Centro o Médico</label>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input 
                                                type="text" 
                                                placeholder="Ej: Cardiología, Sede Central..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={handleQuickSearch}
                                            disabled={!searchTerm || isSearching}
                                            className="flex-1 bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all disabled:opacity-50"
                                        >
                                            {isSearching ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Buscar Turnos"}
                                        </button>
                                        <button 
                                            onClick={clearFilters}
                                            className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                                        >
                                            Limpiar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in slide-in-from-left-2 duration-500">
                                    {/* Specialty Selection */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">1. Especialidad</label>
                                        <select 
                                            value={selectedSpecialty}
                                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Selecciona Especialidad</option>
                                            {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>

                                    {/* Center Selection (Dynamic) */}
                                    {selectedSpecialty && (
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">2. Centro Médicos Disponibles</label>
                                            <div className="grid grid-cols-1 gap-2">
                                                {PLATFORM_CONFIG.centers
                                                    .filter(c => CENTER_SPECIALTIES[c.id]?.includes(selectedSpecialty))
                                                    .map(center => (
                                                        <button 
                                                            key={center.id}
                                                            onClick={() => {
                                                                if (selectedCenters.includes(center.id)) {
                                                                    setSelectedCenters(selectedCenters.filter(id => id !== center.id));
                                                                } else {
                                                                    setSelectedCenters([...selectedCenters, center.id]);
                                                                }
                                                            }}
                                                            className={`p-4 rounded-2xl border transition-all flex items-center justify-between group ${selectedCenters.includes(center.id) ? "border-blue-600 bg-blue-50/50" : "border-slate-100 hover:border-slate-200"}`}
                                                        >
                                                            <div className="flex items-center gap-3 text-left">
                                                                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${selectedCenters.includes(center.id) ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-400"}`}>
                                                                    <MapPin className="h-4 w-4" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-bold text-slate-900">{center.name}</p>
                                                                    <p className="text-[10px] text-slate-400">{center.type}</p>
                                                                </div>
                                                            </div>
                                                            {selectedCenters.includes(center.id) && <Check className="h-4 w-4 text-blue-600" />}
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                            <div className="flex gap-2 pt-2">
                                                <button 
                                                    onClick={() => setSelectedCenters(PLATFORM_CONFIG.centers.filter(c => CENTER_SPECIALTIES[c.id]?.includes(selectedSpecialty)).map(c => c.id))}
                                                    className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700"
                                                >
                                                    Seleccionar Todos
                                                </button>
                                                <span className="text-slate-300">•</span>
                                                <button 
                                                    onClick={() => setSelectedCenters([])}
                                                    className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600"
                                                >
                                                    Ninguno
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <button 
                                        onClick={handleFilteredSearch}
                                        disabled={!selectedSpecialty || selectedCenters.length === 0 || isSearching}
                                        className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all disabled:opacity-50"
                                    >
                                        {isSearching ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Buscar Agendas Disponibles"}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Results Column */}
                        <div className="lg:col-span-7">
                            <div className="bg-slate-50/50 rounded-[2rem] p-8 h-full min-h-[400px] border border-slate-100 flex flex-col">
                                {results.length > 0 ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Próximos Turnos Disponibles</h4>
                                            <span className="text-[10px] bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Sincronizado</span>
                                        </div>
                                        {results.map((res, i) => (
                                            <div key={res.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all animate-in slide-in-from-bottom-4 duration-500 group" style={{ animationDelay: `${i * 100}ms` }}>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex gap-4">
                                                        <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                                            <CalendarCheck2 className="h-6 w-6 text-slate-400 group-hover:text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-900 uppercase italic tracking-tighter mb-1">{res.professional.name}</p>
                                                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{res.professional.specialty}</p>
                                                            <div className="flex items-center gap-4 mt-4">
                                                                <div className="flex items-center gap-1.5">
                                                                    <Calendar className="h-3 w-3 text-slate-400" />
                                                                    <span className="text-xs font-bold text-slate-500">{format(res.date, "EEEE d 'de' MMMM", { locale: es })}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <Clock className="h-3 w-3 text-slate-400" />
                                                                    <span className="text-xs font-bold text-slate-900">{format(res.date, "HH:mm")} hs</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 mt-2">
                                                                <MapPin className="h-3 w-3 text-slate-300" />
                                                                <span className="text-[10px] font-medium text-slate-400">{res.center.name} • {res.center.address}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                                                        Confirmar
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">¿No encontraste lo que buscabas? Intenta cambiar los filtros.</p>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                                        <div className="h-20 w-20 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-6">
                                            <Stethoscope className="h-10 w-10 text-slate-200" />
                                        </div>
                                        <h4 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">Buscador de Turnos</h4>
                                        <p className="text-xs text-slate-400 font-medium max-w-[240px] mt-2">Completa los campos de la izquierda para ver las agendas disponibles en tiempo real.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center gap-4">
                    <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Estás solicitando un turno para <span className="text-slate-900">Martin (Titular)</span>. Si deseas solicitar para un familiar, selecciona el perfil en el dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}
