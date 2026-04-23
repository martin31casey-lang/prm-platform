---
stepsCompleted: ["step-01-init", "step-02-discovery", "step-02b-vision", "step-02c-executive-summary", "step-03-success", "step-04-journeys", "step-05-domain", "step-06-innovation", "step-07-project-type", "step-08-scoping", "step-09-functional", "step-10-nonfunctional", "step-11-polish"]
inputDocuments: ["docs/planning-artifacts/product-brief-PM-2026-04-16.md", "docs/brainstorming/brainstorming-session-20260414.md"]
workflowType: 'prd'
documentCounts: {
  briefCount: 1,
  researchCount: 0,
  brainstormingCount: 1,
  projectDocsCount: 0
}
classification:
  projectType: "Web App / PWA"
  domain: "Healthcare"
  complexity: "High"
  projectContext: "Greenfield"
---

# Product Requirements Document - PM

**Author:** Martin
**Date:** 2026-04-16

## Executive Summary
Solución integral de salud digital (PWA) diseñada para eliminar la brecha de comunicación entre instituciones médicas y pacientes. Centraliza Historia Clínica (HC), resultados de laboratorios, imágenes y gestión autónoma de turnos médicos en una interfaz única y segura. Resuelve la ineficiencia del modelo analógico (teléfono/presencial), eliminando la incertidumbre del paciente y reduciendo drásticamente la carga operativa institucional.

### The Core Differentiator: Guardia Connect
Implementación de una **Fila Virtual Proactiva** que permite al usuario monitorear tiempos de espera reales y sumarse a la cola de atención de forma remota. Transforma la experiencia de guardia minimizando la espera física y optimizando el flujo de pacientes mediante transparencia absoluta y sincronización en tiempo real con el HIS institucional.

## Project Classification
- **Project Type:** Web App / PWA con integración de API Backend (HIS/RIS).
- **Domain:** Salud (Healthcare) - Altamente regulado.
- **Complexity:** Alta (Integraciones complejas, privacidad de datos sensibles, sincronización real-time).
- **Project Context:** Greenfield - Desarrollo de nueva arquitectura escalable.

## Success Criteria
### User Success
- **Precisión de Arribo:** Detección efectiva vía Geofencing antes del llamado médico.
- **Interacción WhatsApp:** 90% de respuesta a notificaciones de confirmación de llegada.
- **Reducción de Espera:** Menos de 10 min de espera física para usuarios de fila virtual.

### Business Success
- **Optimización de Consultorios:** Reducción del 20% en tiempos muertos médicos.
- **Densidad de Sala:** Disminución del 30% en aglomeraciones de sala de espera física.

### Technical Success
- **Latencia de Notificaciones:** Procesamiento de respuestas WhatsApp en < 10 segundos.
- **Inyección HIS:** Automatización del proceso de admisión al HIS tras confirmación de arribo.

## Project Scoping & Phased Development
**MVP Approach:** Foundational Utility (Turnos + Estudios). Establecer base de confianza del usuario y robustez de integración HIS antes de lanzar Guardia Connect.
**Resource Requirements:** PoC inicial (Full-stack solo). Equipo target producción: 1 Funcional + 2 Devs (o 2F+1D+1QA).
**Effort Estimate:** 9-12 meses para Fases 1-3.

### Phase 1: MVP (Cimientos)
- **Portal de Estudios 360:** Visualización de HC, Laboratorio e Imágenes (PDF/Visor).
- **Gestión de Agendas:** Reserva, reprogramación y cancelaciones en tiempo real.
- **Recetas Digitales:** Repositorio de recetas vigentes extendidas por la institución.
- **Integración Base HIS:** Sincronización de identidad y agenda.

### Phase 2: Guardia Connect (Innovación)
- **Fila Virtual:** Selección de especialidad y visualización de posición remota.
- **Motor WhatsApp:** Notificaciones interactivas basadas en flujo de cola.

### Phase 3: Autoadmisión (Eficiencia)
- **Geofencing:** Autoadmisión automatizada y validación en Tótem.
- **Validación Asincrónica:** Carga y aprobación digital de órdenes médicas.

### Phase 4: Growth & Intelligence
- **Triage Virtual:** IA para sugerencia de especialidades según síntomas.
- **Pagos Digitales:** Integración de copagos y consultas particulares.

## User Journeys
1. **Ignacio (Guardia Connect):** Se anota en fila virtual desde casa, monitorea posición, confirma arribo vía WhatsApp/Geofencing y se atiende en 5 min.
2. **Valeria (Historia Clínica):** Accede al perfil de su hijo, visualiza laboratorio digital y lo muestra al médico sin necesidad de papel.
3. **Roberto (Turnera Inteligente):** Agenda TAC, carga orden médica vía PWA, recibe validación digital y asiste al estudio sin trámites administrativos.
4. **Marta (Gestión Administriva):** Supervisa tablero real-time, gestiona excepciones de pacientes ausentes y optimiza el flujo de consultorios.

## Domain-Specific Requirements
### Compliance & Regulatory
- **Log de Auditoría:** Registro inalterable de versión, fecha y hora de aceptación de T&C (Onboarding).
- **Protección PHI:** Cifrado de datos sensibles en tránsito y reposo según Ley de Protección de Datos Personales.
- **Trazabilidad:** Registro de cada visualización de registro clínico por paciente o personal.

### Technical Constraints
- **Fuente de Verdad:** HIS institucional como único registro maestro (App como visor Read-only).
- **Validación Cruzada:** Uso de Tótem físico como respaldo ante fallas de GPS/WhatsApp.

## Web App Specific Requirements
- **Architecture:** Next.js (App Router) - Híbrido (SSR para Landings/SEO, CSR para Portal).
- **State Management:** Gestión reactiva (Zustand/TanStack Query) para sincronización clínica.
- **PWA Capabilities:** Service Workers para caching y soporte offline básico.
- **Compatibility:** Navegadores Modernos (Evergreen) - Mobile First prioritario.
- **SEO Strategy:** Metadata dinámica y JSON-LD para indexación de servicios médicos.
- **Real-Time Engine:** WebSockets (Socket.io/Redis) para Guardia Connect con fallback a Long Polling.

## Functional Requirements
### 1. Identidad y Acceso
- **FR01:** Registro/Login vinculado al padrón del HIS.
- **FR02:** Gestión de perfiles dependientes (hijos/ancianos).
- **FR03:** Registro de consentimiento digital (T&C).
- **FR04:** Cifrado de info clínica (Compliance).

### 2. Portal 360 (Phase 1)
- **FR05:** Visualización de Historia Clínica sincronizada.
- **FR06:** Consulta/Descarga de resultados de Laboratorio e Imágenes.
- **FR07:** Visualización de recetas digitales vigentes.
- **FR08:** Notificación de nuevos resultados disponibles.

### 3. Gestión de Agendas (Phase 1)
- **FR09:** Búsqueda de disponibilidad por especialidad/centro/médico.
- **FR10:** Agendamiento, reprogramación y cancelación autónoma.
- **FR11:** Sincronización bidireccional inmediata con HIS.

### 4. Guardia Connect (Phase 2)
- **FR12:** Visualización de tiempo de espera y posición en fila real-time.
- **FR13:** Asignación de posición virtual remota.
- **FR14:** Notificaciones interactivas vía WhatsApp Business API.

### 5. Autoadmisión (Phase 3)
- **FR15:** Validación de arribo vía Geofencing.
- **FR16:** Autoadmisión digital (Tótem/App).
- **FR17:** Carga de órdenes médicas para validación asincrónica (Backoffice).

## Non-Functional Requirements
### Security & Availability
- **NFR01:** Cifrado TLS 1.3 (tránsito) y AES-256 (reposo).
- **NFR02:** Deslogueo automático tras 15 min de inactividad.
- **NFR03:** Uptime objetivo del 99.9%.

### Performance & Integration
- **NFR04:** Carga de interfaz (FCP) < 1.5 segundos.
- **NFR05:** Latencia de sincronización HIS < 5 segundos.
- **NFR06:** Soporte offline para visualización de estudios cacheados.
- **NFR07:** Cumplimiento de estándar WCAG 2.1 Nivel AA.

## Estrategia de Mitigación de Riesgos
- **Técnicos:** Sincronización HIS mediante capa de Queue y Caché persistente para mitigar latencia.
- **Mercado:** Fomentar adopción mediante campaña de "Disponibilidad 24/7" y UI simplificada para pacientes crónicos.
- **Operativos:** Validación cruzada GPS + Tótem físico para eliminar falsos positivos de llegada.
- **Compliance:** Auditorías de logs y arquitectura de adaptadores para aislar el modelo de datos sensible.
