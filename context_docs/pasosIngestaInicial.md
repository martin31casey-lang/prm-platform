
A continuación, detallo el procedimiento paso a paso:

---


El orden es crítico para mantener la **integridad referencial** debido a las llaves foráneas (`FK`).

### Paso 1: Tabla `fases`

Antes de cualquier otra cosa, la fase debe existir.

* **Acción**: Buscar o insertar en la tabla `fases` el valor "Fase de Grupos".
* **Resultado**: Obtener el `fase_id` (UUID).

### Paso 2: Tabla `sedes` (Sincronización con Enums)
* **Acción**: agregar campo `country_code` a la tabla `sedes` tipo string de 2 letras.

Esta tabla requiere el código de país de la sede en formato ISO de 2 letras para coincidir con el `enum`.

* **Acción**: Leer las columnas `estadio`, `pais_estadio` (en mayúsculas/sin acentos) y `countrycode`.
* **Mapeo**:
* `nombre_estadio`  `estadio`
* `pais_anfitrion`  `pais_estadio`
* `country_code` `countrycode` (Asegurar que sea "MX", "US" o "CA").


* **Resultado**: Obtener el `sede_id` (UUID).

### Paso 3: Tabla `paises` (Nueva Columna `country_code`)
* **Acción**: agregar campo `country_code` a la tabla `paises` tipo string de 2 letras.

Aquí es donde se utiliza la nueva información de 2 letras para los equipos.

* **Acción**: Iterar por cada fila del CSV y recolectar los datos de `pais1` y `pais2`.
* **Mapeo**:
* `nombre`  `pais1` / `pais2`
* `abreviatura`  `abr1` / `abr2` (3 letras)
* `country_code`  `countrycodepais1` / `countrycodepais2` (2 letras).


* **Nota**: Se recomienda un `UPSERT` (insertar si no existe, actualizar si existe) basado en el nombre del país para evitar duplicados.
* **Resultado**: Obtener los `pais_id` (UUIDs).

### Paso 4: Tabla `grupos` y `grupo_paises`

Relacionar los equipos con su grupo correspondiente.

1. **`grupos`**: Insertar el nombre del grupo (columna `grupo`) asociado al `fase_id`.
2. **`grupo_paises`**: Por cada país identificado en el paso anterior, crear el registro que lo vincula al `grupo_id`.

### Paso 5: Tabla `partidos` (Evento Principal)

* **Acción**: Crear el registro del encuentro.
* **Mapeo**:
* `fecha_juego`  Combinar `fecha` + `hora` (formato ISO 8601).
* `sede_id`  El UUID obtenido en el Paso 2.
* `fase_id`  El UUID obtenido en el Paso 1.
* `estado`  "programado".



### Paso 6: Tabla `partido_selecciones` (Relación Muchos a Muchos)

Finalmente, asignar los dos países al partido creado.

* **Inserción A**: `partido_id`, `pais_id` (del país 1), `condicion` = "local".
* **Inserción B**: `partido_id`, `pais_id` (del país 2), `condicion` = "visitante".

---

### Resumen del Flujo de Datos

### Recomendaciones para el Desarrollador

* **Manejo de UUIDs**: Dado que el modelo usa `uuid` como PK, si el script se corre varias veces, se deben usar funciones de "Upsert" o verificar la existencia por nombre para evitar duplicados.
* **Transaccionalidad**: Envolver la carga de cada partido (tabla `partidos` + las dos entradas de `partido_selecciones`) en una **transacción SQL** para asegurar la integridad de los datos.
* **Normalización de Nombres**: El CSV tiene "México" pero la tabla `sedes` requiere "MEXICO" (sin acento y mayúsculas). El script debe estandarizar estos strings antes de la inserción.

¿Te gustaría que redacte un fragmento de código en Python/SQL para automatizar uno de estos pasos específicos?