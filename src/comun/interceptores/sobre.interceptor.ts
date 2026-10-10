import {
CallHandler,
ExecutionContext,
Injectable,
NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


//// La forma de toda respuesta exitosa. <T> es el tipo de lo que va en data.
export interface Sobre<T>{
  data: T,
  meta: {
    ruta: string,
    duracionMs: number,
    timestamp: string;
  };
}

//sirve para que todas las respuestas exitosas de tu API tengan la misma forma.
//GET /clases regresa una lista suelta, GET /clases/1 regresa un objeto suelto, y cada ruta tiene su propia forma

@Injectable()
export class SobreInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, siguiente: CallHandler): Observable<Sobre<unknown>>{
    // ANTES: la ruta y la hora de inicio.
    const req= context.switchToHttp().getRequest<{url: string}>();
    const inicio= Date.now();

    return siguiente.handle().pipe(
// DESPUES: "data" es lo que regreso el controller. Lo metemos en el
// sobre. Los errores no pasan por aqui: van directo al filtro.
    map((data) => ({
      data,
      meta: {
      ruta: req.url,
      duracionMs: Date.now() - inicio,
      timestamp: new Date().toISOString(),
      }
    }))
    );
  }
}