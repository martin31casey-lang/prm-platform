---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: ["docs/brainstorming/brainstorming-session-20260414.md"]
date: 2026-04-16
author: Martin
---

# Product Brief: PM

## Executive Summary
La plataforma de pacientes 360 (PM) nace para digitalizar la interacción entre la institución de salud y sus pacientes. Actualmente, los pacientes dependen exclusivamente del canal telefónico para gestionar turnos y no tienen acceso digital a sus estudios médicos. PM transformará esta experiencia mediante una **PWA (Progressive Web App)** que centraliza el acceso a la Historia Clínica, resultados de imágenes y gestión autónoma de turnos, eliminando fricciones operativas y devolviendo la autonomía sobre su salud al paciente.

---

## Core Vision

### Problem Statement
La ausencia de una interfaz digital propia obliga a los pacientes a depender de canales telefónicos saturados para trámites básicos y les impide visualizar sus resultados médicos de forma inmediata, generando ineficiencia administrativa y una experiencia fragmentada.

### Problem Impact
- **Pacientes:** Frustración por tiempos de espera, traslados innecesarios para buscar estudios físicos y falta de control sobre su historial de salud.
- **Institución:** Alta carga operativa en el call center y personal administrativo, procesos propensos a errores y falta de un canal de comunicación directo para reducir el ausentismo (No-Show).

### Why Existing Solutions Fall Short
El modelo tradicional (teléfono/presencial) no es escalable y no satisface las expectativas de inmediatez de los pacientes actuales. Las soluciones actuales carecen de una integración fluida que centralice toda la información en un solo lugar seguro.

### Proposed Solution
Una PWA de alto rendimiento integrada con los backends institucionales, que ofrezca autogestión de turnos, visualización de Historia Clínica/Imágenes y gestión de planes de salud bajo una experiencia de usuario *premium* y segura.

### Key Differentiators
- **Formato PWA:** Acceso instantáneo y liviano desde cualquier móvil o escritorio sin fricción de descarga.
- **Visión 360 Real:** No es solo una agenda de turnos; es el portal central de toda la vida médica del paciente en la institución.
- **Simplicidad de Uso:** Enfocada en reducir clics para tareas críticas (como ver un resultado o cancelar un turno).

---

## Target Users

### Primary Users
- **Valeria (Gestión Familiar):** 30-45 años. Su prioridad es la velocidad. Necesita gestionar turnos de sus hijos y descargar resultados de laboratorio rápidamente para compartirlos con médicos externos.
- **Roberto (Paciente Crónico/Recurrente):** 60+ años. Valora el orden y la transparencia. Su mayor beneficio es tener el **histórico de su HC e Imágenes** digitalizado, eliminando la necesidad de cargar carpetas con estudios viejos.
- **Ignacio (Paciente de Guardia/Eventual):** 20-50 años. Uso esporádico pero intenso. Necesita acceso crítico a la **Receta Digital** y al informe de alta post-atención para continuar su tratamiento sin esperas administrativas.

### Secondary Users
- **Equipo de Admisión y Call Center:** Usuarios indirectos que verán reducida la presión de llamadas para trámites básicos, permitiéndoles enfocarse en casos complejos.

### User Journey
- **Descubrimiento:** El paciente conoce la PWA mediante cartelería en la institución (QR) o al recibir un SMS/Mail de confirmación de turno.
- **Onboarding:** Proceso de alta simplificado con validación de identidad y asociación de su Plan de Salud existente.
- **Uso Frecuente:** El paciente consulta "Mis Estudios" o "Mis Turnos" de forma autónoma. La integración con el HIS asegura que la información sea siempre la oficial.
- **Momento "Aha!":** Salir de la guardia y encontrar la receta digital ya disponible en la PWA, o ver una placa de rayos X desde su casa sin haber tenido que esperar un CD.

---

## Success Metrics

La clave del éxito de la plataforma reside en la migración efectiva de los pacientes desde los canales analógicos hacia la autogestión digital.

- **Migración de Canales:** Lograr que al menos un **30% de la gestión de turnos** totales se realice a través de la PWA en los primeros 6 meses post-lanzamiento.
- **Autonomía en Información:** Medir el incremento mensual de descargas de informes (laboratorio e imágenes) via PWA, apuntando a una reducción del 40% en pedidos presenciales de estos materiales.
- **Inmediatez en Guardia:** Asegurar que el **90% de las recetas digitales** estén disponibles para el paciente en menos de 5 minutos después del alta médica.

### Business Objectives

- **Descongestión Operativa:** Reducir en un 20% el volumen de llamadas entrantes al Call Center relacionadas con trámites administrativos básicos.
- **Reducción de No-Shows:** Disminuir la tasa de ausentismo mediante recordatorios automáticos (Push/SMS) y la facilidad de cancelación/reprogramación con un solo clic.
- **Eficiencia de Costos:** Reducción progresiva de costos de impresión y soportes físicos (papel, sobres, CDs) gracias a la adopción del formato digital.

### Key Performance Indicators (KPIs)

- **Conversion Rate:** % de pacientes que regresan a la PWA después de su primer uso (Retención).
- **Sincronización HIS-Portal:** Latencia entre el cierre del episodio asistencial en el HIS y la visibilidad en el portal (Target: < 1 minuto).
- **NPS de Plataforma:** Índice de satisfacción del usuario específicamente sobre la experiencia digital.

---

## MVP Scope

### Core Features
- **Acceso e Identidad:** Registro seguro y validación automática de cobertura/plan de salud del paciente.
- **Agendamiento Digital (HIS):** Integración bidireccional para reserva, reprogramación y cancelación de turnos en tiempo real.
- **Portal de Estudios 360:** Visualización completa de Historia Clínica e informes de Imágenes/Laboratorio sincronizados con los sistemas core.
- **Repositorio de Recetas:** Acceso inmediato a las recetas digitales generadas en consultas o guardia.

### Out of Scope for MVP
- Pasarelas de Pago integradas.
- Motor nativo de Telemedicina.
- Seguimiento de Biométricas (Wearables).
- Chatbot de IA para autodiagnóstico.

### MVP Success Criteria
- Validar que la sincronización con el HIS tenga un **Uptime del 99.9%**.
- Lograr que el proceso de "sacar un turno" tome menos de **45 segundos** para un usuario registrado.

---

## Roadmap (Visión de Futuro)

### Fase 1: Finanzas y Fidelización (Q3-Q4)
- **Pagos Online:** Habilitación de pagos de copagos y cancelación de deudas institucionales desde la PWA.
- **Check-in Digital:** Permitir que el paciente anuncie su llegada a la institución desde su celular para evitar colas en recepción.

### Fase 2: Salud Ubicua (Año 1)
- **Telemedicina:** Integración de videoconsultas para seguimiento de pacientes crónicos y consultas de baja complejidad.
- **Módulos de Bienestar:** Conexión con Apple Health y Google Fit para el seguimiento proactivo de la salud del paciente.

### Fase 3: Intelligence Foundation (Año 2+)
- **Asistente AI:** Implementación de un copiloto inteligente para ayudar al paciente a entender sus estudios y realizar un triaje inicial antes de ir a guardia.
