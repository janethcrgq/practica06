# Gimnasio API — Código base (Semana 5)

API REST en NestJS para el gimnasio: `Clases`, `Horarios`, `Miembros` e `Inscripciones`, cada
módulo con dominio, DTOs e infraestructura separados (patrón repositorio + inyección por token).
Los datos viven en memoria — ningún repositorio se conecta todavía a una base de datos real.

Este proyecto es el punto de partida de la Práctica 8 (Prisma) y la Práctica 9 (Blindar la API).

## Cómo correrlo

```bash
npm install
npm run start:dev
```

El servidor levanta en `http://localhost:3000`. En `peticiones.http` está la batería completa de
pruebas (requiere la extensión "REST Client" de VS Code).

## Estructura

```
src/
  clases/        CRUD de clases del gimnasio
  horarios/      CRUD de horarios (día, hora, cupo, entrenador)
  miembros/      CRUD de miembros del gimnasio
  inscripciones/ inscribir a un miembro a un horario, con reglas de cupo y duplicados
  datos/         datos de arranque (seed) que usan Horarios y Miembros
```

Cada módulo sigue la misma forma: `dominio/` (entidades + interfaz del repositorio), `dto/`,
`infra/` (repositorio en memoria) y el token de inyección en `<módulo>.tokens.ts`.

## Pregunta 1 

¿Por qué el paquete del adaptador se llama adapter-mariadb si usamos MySQL?

Porque Prisma no tiene un adaptador propio para MySQL, sino que usa por dentro el driver mariadb de npm. Como MariaDB es un fork de MySQL y ambos comparten el mismo protocolo de comunicación entre cliente y servidor, ese driver funciona igual de bien para conectarse a cualquiera de los dos. Por eso el paquete lleva ese nombre: hace referencia al driver que usa, no a que solo sirva con MariaDB.

## Pregunta 2 

¿Editar schema.prisma cambió algo en la base de datos antes de migrar?

No. schema.prisma es solo un archivo de texto local. Es la representación deseada del esquema, pero Prisma no toca la base de datos hasta que le pides explícitamente que lo haga. Al correr prisma migrate dev, Prisma compara el estado actual de la base de datos contra lo declarado en el schema, calcula la diferencia, genera el SQL correspondiente y recién ahí lo aplica. Mientras tanto, la base de datos permanece exactamente como estaba antes de editar el archivo.

## Pregunta 3 

¿La carpeta de migraciones es una foto del esquema o un historial?

Es un historial, no una foto. Cada vez que corres prisma migrate dev se crea una carpeta nueva con timestamp que contiene únicamente el SQL incremental de ese cambio (el "diff" respecto al estado anterior), no el esquema completo. El estado actual de la base de datos es el resultado de aplicar, en orden, todas esas migraciones acumuladas desde el inicio del proyecto. Es por eso que nunca se deben borrar ni editar migraciones ya aplicadas, y por eso el equipo completo necesita correr las mismas migraciones en el mismo orden para llegar al mismo esquema.

## Pregunta 4 

¿Por qué Horario.clase sí crea columna y Clase.horarios no?

En una relación uno a muchos, la llave foránea siempre vive del lado "muchos", porque cada fila de ese lado solo puede apuntar a un registro del otro lado. Un Horario pertenece a una sola Clase, así que la tabla horario necesita una columna claseId para guardar esa referencia. En cambio, Clase.horarios es un campo de relación virtual: no se guarda nada en la tabla clase, Prisma simplemente lo calcula al vuelo haciendo SELECT * FROM horario WHERE claseId = <id de la clase>. Por eso solo uno de los dos lados de la relación genera columna física.

## Pregunta 5 

¿De dónde sale la relación de muchos a muchos entre Miembro y Horario, si nunca se declaró?

Sale de forma implícita a través de Inscripcion, que actúa como tabla intermedia. Tiene una relación muchos-a-uno hacia Horario y otra muchos-a-uno hacia Miembro. Como cada miembro puede tener varias inscripciones (a distintos horarios) y cada horario puede tener varias inscripciones (de distintos miembros), el resultado es que un miembro puede estar en muchos horarios y un horario puede tener muchos miembros, es decir, una relación muchos a muchos entre Miembro y Horario, pero modelada explícitamente mediante una tabla intermedia en vez de usar el m-n implícito de Prisma. Se hace así porque la relación necesita cargar datos propios que un m-n implícito no podría almacenar.

## Preguntas de Practica 9

## Pregunta 1 
¿Qué línea del Service o del Controller tuvo que cambiar para que Clases hablara con MySQL?

Ninguna línea del ClasesService ni del ClasesController cambió. El único cambio fue en clases.module.ts, donde se modificó el valor de useClass de ClaseMemoriaRepository a ClasePrismaRepository. Esto fue posible porque, gracias a la arquitectura, el ClasesService depende de la interfaz ClaseRepository, no de una implementación concreta. Al crear esa interfaz, el Service nunca necesita saber qué clase la está implementando por debajo, así que solo fue necesario cambiar qué implementación se inyecta en el módulo.

## Pregunta 2
¿Por qué InscripcionesService no cambió ni una línea de las reglas de cupo/duplicados?

Porque esas reglas viven en el Service, y el Service solo depende de la interfaz InscripcionRepository, no de su implementación. Cambiar de memoria a Prisma solo cambió cómo se guardan y obtienen los datos, no qué hace el Service con ellos una vez que los tiene, así que no había nada en esa lógica que tocar.

## Pregunta 3
¿Por qué una interfaz no puede validar en tiempo de ejecución?

Porque las interfaces de TypeScript se borran al compilar a JavaScript, no existen en el código que realmente corre. class-validator necesita algo real sobre qué validar cuando llega una petición, y una interfaz ya no está ahí para ese momento. Por eso se cambiaron a clases, que sí existen en tiempo de ejecución.

## Pregunta 4
¿Qué código de estado responde y qué trae en el cuerpo?

En ambos casos responde 400 Bad Request. El cuerpo trae { message, error, statusCode }, donde message es un arreglo con el detalle del error. Para un tipo incompatible, indica qué regla falló ("claseId must be an integer number"), para un campo no declarado, indica que no debería existir ("property colorFavorito should not exist").

## Pregunta 5
¿Cuántas líneas quedó más corto el controlador con el filter?

Aproximadamente 10 líneas. El bloque try catch que traducía los errores de dominio a NotFoundException/ConflictException se redujo a solo 3 líneas sin try/catch, una vez que el filtro de excepciones asumió esa responsabilidad.

## Prgeunta 6
Si la respuesta llega en los dos casos, ¿quién bloquea
realmente y a quién protege?

El navegador bloquea, el servidor siempre manda la respuesta completa sin importar el origen. Y protege al usuario, no al servidor ya que evita que un sitio malicioso, usando la sesión activa del usuario en el navegador, pueda leer respuestas de otros sitios sin que el usuario se entere.


