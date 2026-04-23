# Product Backlog & Roadmap - VitalPlus Health Platform

Este documento centraliza la evolución de la plataforma VitalPlus como un ecosistema Multi-tenant para instituciones de salud.

---

## 0. Arquitectura de Secciones (Multi-tenant Core)
**Estado:** `En Progreso` | **Prioridad:** `Máxima`

- [x] **Sección (corporate):** Landing page institucional, servicios y acceso a clientes (Marketing Site).
- [ ] **Sección (admin):** Dashboard Institucional B2B. Configuración de sedes, carga de novedades, branding (Marca Blanca) y gestión de staff.
- [x] **Sección (staff):** Consola Médica unificada. Gestión de guardia, historia clínica y telemedicina. (Estructura base completada)
- [ ] **Sección (portal):** Portal de Pacientes PWA dinámico con soporte multi-institución.

---

## 1. Portal de Gestión Institucional (Admin / Client)
**Estado:** `Backlog` | **Prioridad:** `Alta`

### User Story
**Como** Director de una Clínica que compró VitalPlus,  
**Quiero** un panel de autogestión (Self-Service),  
**Para** configurar mi branding, publicar noticias institucionales y gestión de staff médico sin depender de VitalPlus.

### Key Features
- **Gestión de Marca Blanca:** Editor para subir Logo y definir colores (`primaryColor`, `secondaryColor`) dinámicos.
- **Centro de Novedades:** CRUD de noticias con soporte para imágenes que se verán en el portal de sus pacientes.
- **Administración de Personal:** Alta/Baja de médicos vinculados a la institución y sus respectivas sedes.
- **Configuración de Sedes:** Gestión de direcciones, horarios y tiempos de guardia estimados.
- **Analytics B2B:** Métricas básicas de uso del portal por parte de sus pacientes.

---

## 2. Consola Médica Unificada (Staff Section)
**Estado:** `En Progreso` | **Prioridad:** `Crítica`

### User Story
**Como** Médico de Guardia,  
**Quiero** ver la fila de espera y atender llamadas de telemedicina sin salir de la plataforma,  
**Para** optimizar el tiempo de atención y reducir el error humano.

### Tareas y Estado
- [x] **Migración de rutas:** Movimiento de `/doctor-portal` a `/staff/console` y creación de Layout premium.
- [ ] **Autenticación Staff:** Implementar flujo de Login específico para médicos y personal de salud.
- [ ] **Integración Telemedicina:** Configuración final de Jitsi External API y manejo de estados de llamada.
- [ ] **Módulo SOAP:** Evolución clínica rápida integrada en la consola.

---

## 3. Escalabilidad de Telemedicina (Jitsi Pro)
**Estado:** `Backlog` | **Prioridad:** `Media`

- Implementar servidores propios de Jitsi (Jitsi Video Bridge) para instituciones grandes.
- Soporte para grabación de sesiones y auditoría.

## 4. Portal de Staff Unificado & RBAC
**Estado:** `Backlog` | **Prioridad:** `Alta`

- [ ] **Acceso Centralizado:** Login único para personal de salud y administradores en `/staff/login`.
- [ ] **Role-Based Access Control (RBAC):** Definir permisos para `ADMIN` (gestión), `DOCTOR` (consola médica) y `RECEPTIONIST` (gestión de colas).
- [ ] **Gestión de Institución Pro:** Panel para que el Administrador configure staff, sedes y vea reportes de encuestas de satisfacción de telemedicina.
- [ ] **Seguridad de Rutas:** Middleware de protección para validar roles antes de acceder a sub-rutas de `/staff`.

---
*Documento actualizado el 2026-04-21 para reflejar la visión de Portal de Staff Unificado y Encuestas de Satisfacción*

