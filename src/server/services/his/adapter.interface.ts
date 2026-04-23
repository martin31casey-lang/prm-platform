import type { 
    UniversalAppointment, 
    UniversalMedicalStudy, 
    UniversalProfessional 
} from "./universal-types";

export interface IHISAdapter {
    /**
     * Obtener los turnos programados para un paciente específico
     */
    getPatientAppointments(patientHisId: string): Promise<UniversalAppointment[]>;

    /**
     * Obtener el historial de estudios médicos (Laboratorio / Imágenes)
     */
    getPatientStudies(patientHisId: string, filters?: { type?: 'LAB' | 'IMG', days?: number }): Promise<UniversalMedicalStudy[]>;

    /**
     * Buscar disponibilidad de agendas para un profesional o especialidad
     */
    getAvailableSlots(specialtyId: string, doctorId?: string): Promise<UniversalAppointment[]>;

    /**
     * Notificar al HIS la llegada del paciente (Auto-admisión)
     */
    checkInPatient(appointmentId: string): Promise<boolean>;

    /**
     * Obtener lista de profesionales activos en el sistema
     */
    getProfessionals(specialty?: string): Promise<UniversalProfessional[]>;
}
