## Preguntas — Práctica 7 (Miembros)

### 1. ¿Por qué la interfaz `MiembroRepository` no menciona Express, NestJS ni memoria?

Porque es un contrato del dominio, no un detalle de implementación. La interfaz solo
describe qué operaciones existen sobre un Miembro (listar, buscarPorId, crear,
actualizar, eliminar), no cómo se resuelven. Express es un detalle de transporte HTTP y memoria
es un detalle de persistencia. Si la interfaz mencionara cualquiera de
los dos, el dominio quedaría atado a una tecnología específica, y perderíamos la
posibilidad de cambiar a Prisma/MySQL más adelante sin tocar el Service ni el Controller.

### 2. ¿Qué palabra de `MiembroMemoriaRepository` es la que promete cumplir la interfaz del paso anterior?

implements. Es la palabra clave que obliga al compilador de TypeScript a verificar que
MiembroMemoriaRepository tenga los cinco métodos de `MiembroRepository`, con las mismas
firmas. Sin implements, no habría ninguna garantía de que la clase concreta realmente cumpla 
el contrato del dominio.

### 3. ¿Por qué `miembros.service.ts` no sabe qué es una petición HTTP?

Porque solo conoce la interfaz MiembroRepository y los DTOs. No importa nada relacionado a HTTP.
Toda esa traducción entre HTTP y el dominio es responsabilidad exclusiva del
Controller; el Service recibe datos ya extraídos del `@Body()` y devuelve entidades o
`null`, sin enterarse nunca de si esos datos llegaron por una petición web, una prueba
automatizada o cualquier otro medio.

### 4. ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?

MiembrosService es una clase concreta, existe como valor real en tiempo de
ejecución, así que Nest puede usar el propio tipo de la clase para saber qué instancia inyectar.
MiembroRepository, en cambio, es solo una interfaz de TypeScript que se
borra por completo al compilar a JavaScript y no deja ningún rastro en tiempo de
ejecución. Como Nest no tiene nada para buscar para ese tipo, hace falta un token
(MIEMBRO_REPOSITORY) que actúe como etiqueta explícita, para decirle manualmente qué
proveedor concreto (MiembroMemoriaRepository) entregar en ese lugar del constructor.

### 5. ¿Qué prueba, en los hechos, que agregar Miembros no rompió nada de Inscripciones?

Que al repetir las mismas peticiones de la Práctica 6 sobre `/inscripciones` (listar,
buscar, crear, cancelar) se obtienen exactamente los mismos códigos de estado y la misma
estructura de datos que antes de agregar el módulo Miembros. Como cada módulo tiene su
propio Controller, Service, Repository y token de inyección completamente aislados,
registrar MiembrosModule en app.module.ts no modifica ni una sola línea de
InscripcionesModule. Si algo se hubiera roto, sería porque se tocó código compartido, no por
el simple hecho de sumar un módulo nuevo al proyecto.


## Preguntas

### 1. ¿Qué pasaría si el módulo no quedara registrado en la raíz?

El AppModule no importaría el módulo correspondiente, así que sus controllers y
providers nunca entrarían al contenedor de dependencias de Nest. Las rutas de ese
módulo no existirían y cualquier petición a ellas respondería 404, aunque el código
esté bien escrito.

### 2. ¿Por qué los métodos del repositorio devuelven promesas si los datos van a estar en memoria?

Porque el contrato InscripcionRepository se diseña pensando en el caso más lento
(una base de datos real), no en la implementación actual. Así, cuando edespués cambie a MySQL/Prisma, el Service no cambia ni una línea de código, porque ya estaba
esperando promesas desde un inicio.

### 3. ¿Qué error apareció al cambiar a la interfaz, y por qué la clase sí se había resuelto sola?

Nest can't resolve dependencies of the InscripcionesService (?).

La clase se resuelve sola porque sobrevive al compilar, TypeScript deja su
constructor real en el JavaScript final, y NestJS lo puede leer. Una interfaz, en cambio, se borra por completo al compilar, así que Nest no tiene ningún tipo real
que buscar y el arranque falla.

### 4. ¿Por qué el servicio necesita un token para el repositorio, pero el controlador no lo necesita para el servicio?

Porque InscripcionesService es una clase real, existe en tiempo de ejecución y
es su propia llave para el contenedor de Nest. InscripcionRepository
es una interfaz, no existe en tiempo de ejecución, así que necesita el token para que Nest sepa qué instancia entregar cuando alguien la pida.

### 5. ¿Cuál es la diferencia entre un 400 y un 409?

**400** significa "no entiendo la petición" (el cuerpo llegó mal formado o le
faltan campos obligatorios). **409** significa "sí te entiendo, pero esto choca
con el estado actual del sistema" (como el caso de que el cupo ya está lleno o el
miembro ya esté inscrito).

### 6. ¿Por qué cambió el código de estado de esa última petición?

La petición de miembroId: 3 había fallado con 409 porque el horario 1 ya tenía
2 inscripciones confirmadas (cupo máximo). Al cancelar la inscripción de
miembroId: 1, su estado cambió a cancelada, y el Service solo cuenta las
inscripciones con estado confirmada para validar el cupo. Al cancelar una
liberó un lugar y ahora sí ese pudo inscrbir, respondiendo 201.

