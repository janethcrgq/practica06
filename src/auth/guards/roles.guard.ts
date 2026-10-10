import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../decoradores/roles.decorator';
import { PayLoadJwt, Rol } from '../dominio/usuario';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(contexto: ExecutionContext): boolean {
    const permitidos = this.reflector.getAllAndOverride<Rol[] | undefined>(ROLES, [
      contexto.getHandler(),
      contexto.getClass(),
    ]);
    if (!permitidos) return true; 

    const { user } = contexto.switchToHttp().getRequest<{ user?: PayLoadJwt }>();
    if (!user || !permitidos.includes(user.rol)) {
      throw new ForbiddenException('No tienes permiso para esta accion'); 
    }
    return true;
  }
}