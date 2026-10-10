import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayLoadJwt } from '../dominio/usuario';

//el decorador solo existe,
//  y empieza a funcionar cuando se escribe sobre el parámetro de un método.
export const UsuarioActual = createParamDecorator(
  (_dato: unknown, contexto: ExecutionContext): PayLoadJwt => {

    const req = contexto.switchToHttp().getRequest<{ user: PayLoadJwt }>(); //toma la peticion
    return req.user; //devuelve el usuario

  },
);