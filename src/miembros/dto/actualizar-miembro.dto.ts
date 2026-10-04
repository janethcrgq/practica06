// Todo opcional: un PATCH manda solo lo que cambia. "activo" es el

import { IsBoolean, isBoolean, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

// campo pensado para dar de baja a un miembro sin borrar su historial.
export class ActualizarMiembroDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsIn(['basica', 'plus', 'premium'])
  membresia?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
