import type { IHISAdapter } from "./adapter.interface";
import type { 
    UniversalAppointment, 
    UniversalMedicalStudy, 
    UniversalProfessional 
} from "./universal-types";

export class MockHISAdapter implements IHISAdapter {
    async getPatientAppointments(patientHisId: string): Promise<UniversalAppointment[]> {
        console.log(`[MockHIS] Buscando turnos para paciente: ${patientHisId}`);
        return [
            {
                id: "apt_1",
                externalId: "HIS-TURN-9921",
                start: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // En 2 días
                end: new Date(Date.now() + 1000 * 60 * 60 * 24.5 * 2),
                status: 'confirmed',
                professional: {
                    id: "doc_1",
                    name: "Dr. Alberto García",
                    specialty: "Cardiología"
                },
                facility: {
                    id: "fac_1",
                    name: "Clínica Central - Ala Sur"
                },
                reason: "Control preventivo"
            }
        ];
    }

    /**
     * Obtener el historial de estudios médicos (Laboratorio / Imágenes)
     */
    async getPatientStudies(patientHisId: string, filters?: { type?: 'LAB' | 'IMG', days?: number }): Promise<UniversalMedicalStudy[]> {
        const studies: UniversalMedicalStudy[] = [
            { id: "s1", externalId: "LAB-001", date: new Date(Date.now() - 1000 * 3600 * 24 * 2), description: "Hemograma Completo", modality: "LAB", status: 'final', resultSummary: "Normal" },
            { id: "s2", externalId: "IMG-001", date: new Date(Date.now() - 1000 * 3600 * 24 * 5), description: "Radiografía de Tórax", modality: "DX", status: 'final', reportUrl: "#" },
            { id: "s3", externalId: "LAB-002", date: new Date(Date.now() - 1000 * 3600 * 24 * 10), description: "Perfil Lipídico", modality: "LAB", status: 'final', resultSummary: "Colesterol levemente elevado" },
            { id: "s4", externalId: "IMG-002", date: new Date(Date.now() - 1000 * 3600 * 24 * 15), description: "Resonancia Magnética Cerebro", modality: "MR", status: 'final', pacsLink: "#" },
            { id: "s5", externalId: "LAB-003", date: new Date(Date.now() - 1000 * 3600 * 24 * 25), description: "Glucemia Post-Pandrial", modality: "LAB", status: 'final', resultSummary: "110 mg/dL" },
            { id: "s6", externalId: "IMG-003", date: new Date(Date.now() - 1000 * 3600 * 24 * 35), description: "Ecografía Abdominal", modality: "US", status: 'final', reportUrl: "#" },
            { id: "s7", externalId: "LAB-004", date: new Date(Date.now() - 1000 * 3600 * 24 * 45), description: "Orina Completa", modality: "LAB", status: 'final', resultSummary: "Normal" },
            { id: "s8", externalId: "IMG-004", date: new Date(Date.now() - 1000 * 3600 * 24 * 60), description: "TAC de Abdomen", modality: "CT", status: 'final', reportUrl: "#" },
            { id: "s9", externalId: "LAB-005", date: new Date(Date.now() - 1000 * 3600 * 24 * 5), description: "Test de Vitamina D", modality: "LAB", status: 'final', resultSummary: "32 ng/mL" },
            { id: "s10", externalId: "IMG-005", date: new Date(Date.now() - 1000 * 3600 * 24 * 12), description: "Mamografía Digital", modality: "DX", status: 'final', reportUrl: "#" },
        ];

        let filtered = studies;
        if (filters?.days) {
            const limitDate = new Date(Date.now() - 1000 * 3600 * 24 * filters.days);
            filtered = filtered.filter(s => s.date >= limitDate);
        }
        if (filters?.type) {
            if (filters.type === 'LAB') filtered = filtered.filter(s => s.modality === 'LAB');
            else filtered = filtered.filter(s => s.modality !== 'LAB');
        }
        return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    async getAvailableSlots(specialtyId: string, doctorId?: string): Promise<UniversalAppointment[]> {
        return [];
    }

    async checkInPatient(appointmentId: string): Promise<boolean> {
        return true;
    }

    async getProfessionals(specialty?: string): Promise<UniversalProfessional[]> {
        return [
            { id: "p1", name: "Dra. Elena Rivas", specialty: "Oftalmología" },
            { id: "p2", name: "Dr. Martín Palermo", specialty: "Traumatología" }
        ];
    }
}
