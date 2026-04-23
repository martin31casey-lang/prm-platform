# VitalPlus Health Architecture - Multi-tenant Ecosystem

Este documento describe la arquitectura técnica de VitalPlus Health, una plataforma SaaS (Software as a Service) diseñada para la gestión integral de instituciones de salud con capacidades de Marca Blanca (White-label).

---

## 1. Estrategia de Multi-tenancy (Aislamiento de Clientes)

VitalPlus utiliza una arquitectura de **Base de Datos Compartida con Esquema Compartido**, donde la separación de datos se garantiza mediante un `institutionId` obligatorio en todas las entidades críticas.

### Enrutamiento basado en Dominio (Middleware)
El acceso a los diferentes "mundos" de la plataforma se gestiona dinámicamente mediante un Middleware de Next.js que analiza el `hostname`:

- **Dominio Corporativo (vitalplushealth.com):** 
  - Muestra la Landing Page de ventas (`src/app/(corporate)/landing`).
  - Permite el acceso al **Portal de Administración Institucional** (`/admin`).
- **Dominios de Clientes (ej: quantuminstitucionsalud.com.ar):**
  - Muestra la Landing Page específica de la institución (`src/app/(tenant)/quantum-home`).
  - Muestra el **Portal de Pacientes** (`/dashboard`) y **Telemedicina** con el branding de ese cliente.

---

## 2. Estructura de Directorios (App Router)

El proyecto se organiza en **Grupos de Rutas** para separar las responsabilidades y layouts:

```text
src/app/
├── (corporate)/      # Mundo VitalPlus (Dueño)
│   └── landing/      # Web de ventas y marketing
├── (admin)/          # Mundo Gestión B2B
│   └── admin/        # Configuración de Instituciones (Sedes, Médicos, Branding)
├── (staff)/          # Mundo Médico (Consola)
│   └── doctor-portal/# Atención médica y Telemedicina
├── (portal)/         # Mundo Paciente (APP)
│   └── dashboard/    # Autogestión (Turnos, Estudios, Historia Clínica)
├── (tenant)/         # Mundo Landing Cliente
│   └── quantum-home/ # Landing page específica de la institución (Quantum)
└── middleware.ts     # Orquestador de Dominios
```

---

## 3. Modelo de Datos (Multi-tenant Core)

La base de datos (PostgreSQL + Prisma) se ha estructurado para soportar el crecimiento infinito de clientes:

- **Institution:** El Tenant principal. Contiene `slug`, `customDomain`, y configuración de `Branding` (logos/colores).
- **User & Role:** Sistema de permisos basado en roles (`ADMIN`, `DOCTOR`, `STAFF`, `PATIENT`) vinculados a una `Institution`.
- **Relaciones:** Todas las entidades (`Patient`, `TelemedicineCall`, `MedicalCenter`) están ancladas a una `Institution`.

---

## 4. Motor de Marca Blanca (White-label Engine)

La plataforma es "camaleónica". La UI se adapta dinámicamente:
1. El Middleware identifica la `Institution` por el dominio.
2. Se inyectan los colores (`primaryColor`, `secondaryColor`) y el logo desde el modelo `Institution` a las variables de CSS/Tailwind.
3. El paciente vive una experiencia 100% institucionalizada, sin menciones a VitalPlus.

---

## 5. Próximos Desafíos Arquitectónicos
- **Isolation Layers:** Implementar Row-Level Security (RLS) en Postgres para una capa extra de seguridad entre tenants.
- **Subdominios Dinámicos:** Automatización de la configuración de SSL para nuevos dominios de clientes.
- **HIS Bridge Institucional:** Capacidad de conectar cada `Institution` a su propio servidor de HIS local o en la nube.

---
*Última actualización: 2026-04-19 - Fase de Seccionalización Multi-tenant*
