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

## Capturas

### 201 Created, con header Location
![Inscripción exitosa](capturas/inscripcion1.png)

### 409 — cupo lleno
![Cupo lleno](capturas/409_por_cupo_clase.png)

### 409 — inscripción duplicada
![Inscripción duplicada](capturas/409_repetir_horario.png)

### Cancelación
![Cancelar inscripción](capturas/cancelar_inscripcion_.png)

### Reenvío exitoso tras liberar el cupo
![Inscribir de nuevo](capturas/inscribir_de_nuevo.png)