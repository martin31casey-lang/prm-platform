/**
 * Esquema Universal de Datos de Salud (Basado en simplificación de FHIR)
 * Este archivo define el estándar que PM Platform espera de cualquier HIS/RIS/PACS.
 */

export interface UniversalProfessional {
    id: string;
    name: string;
    specialty: string;
    license?: string;
}

export interface UniversalFacility {
    id: string;
    name: string;
    address?: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'checked-in' | 'completed';

export interface UniversalAppointment {
    id: string;
    externalId: string;
    start: Date;
    end: Date;
    status: AppointmentStatus;
    professional: UniversalProfessional;
    facility: UniversalFacility;
    reason?: string;
}

export type StudyModality = 'DX' | 'CR' | 'CT' | 'MR' | 'US' | 'LAB' | 'ECG' | 'OTHER';

export interface UniversalMedicalStudy {
    id: string;
    externalId: string;
    date: Date;
    description: string;
    modality: StudyModality;
    status: 'preliminary' | 'final' | 'corrected';
    pacsLink?: string; // Para integración con visualizadores DICOM (RIS/PACS)
    reportUrl?: string; // Para resultados en PDF
    resultSummary?: string;
}

export interface UniversalPatient {
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    birthDate: Date;
    gender?: 'male' | 'female' | 'other';
    email?: string;
    phone?: string;
}
