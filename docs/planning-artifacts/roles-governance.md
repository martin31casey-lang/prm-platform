# Definición de Roles y Gobernanza de Contenido (VitalPlus)

Este documento detalla el sistema de permisos y el flujo de trabajo para la gestión de novedades institucionales. Estos roles son configurados exclusivamente por el equipo de VitalPlus durante la implementación.

## 1. Flujo de Trabajo de Novedades (Workflow)

El ciclo de vida de una noticia sigue tres estados obligatorios para garantizar la calidad y seguridad de la comunicación:

| Estado | Descripción | Acción Requerida |
| :--- | :--- | :--- |
| **Borrador (DRAFT)** | La noticia está siendo redactada. No es visible para nadie fuera del staff. | Cargar texto e imagen. |
| **Aprobada (APPROVED)** | La noticia ha sido verificada por un supervisor. Lista para salir. | Revisión de contenido y ortografía. |
| **Activa (ACTIVE)** | La noticia está publicada en la Landing Institucional. | Selección para publicación (Máx. 5). |

---

## 2. Roles Especializados

### 👤 CONTENT_CREATOR (Creador de Contenido)
- **Responsabilidad:** Redacción y carga inicial de la noticia.
- **Permisos:**
  - Crear nuevas entradas en estado `DRAFT`.
  - Editar sus propios borradores.
  - No puede cambiar el estado a `APPROVED` ni `ACTIVE`.

### 👤 NEWS_VERIFIER (Verificador de Noticias)
- **Responsabilidad:** Control de calidad y cumplimiento institucional.
- **Permisos:**
  - Revisar todas las noticias en estado `DRAFT`.
  - Cambiar el estado de `DRAFT` a `APPROVED`.
  - Puede devolver una noticia a `DRAFT` con comentarios.
  - No puede publicar directamente en la Landing (`ACTIVE`).

### 👤 NEWS_PUBLISHER (Publicador de Noticias)
- **Responsabilidad:** Decisión estratégica de publicación.
- **Permisos:**
  - Seleccionar hasta 5 noticias en estado `APPROVED`.
  - Cambiar el estado de `APPROVED` a `ACTIVE`.
  - Desactivar noticias (mover de `ACTIVE` a `APPROVED`).
  - Es el único que tiene acceso al Toggle de la Landing en el Dashboard.

---

## 3. Gobernanza y Seguridad
- **Configuración por Tabla:** Los roles no son gestionables por la institución. Se asignan en la base de datos de VitalPlus.
- **Trazabilidad:** Cada cambio de estado queda registrado con el ID del usuario que realizó la acción (`authorId`, `verifierId`, `publisherId`).

---
*Documento de Referencia para Implementación - VitalPlus Health 2026*
