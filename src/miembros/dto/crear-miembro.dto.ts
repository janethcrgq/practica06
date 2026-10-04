// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace

import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";

// ValidationPipe.
export class CrearMiembroDto {
  @IsString()
  @IsNotEmpty()
  nombre: string= "";

  @IsEmail()
  correo: string= "";

  @IsIn(['basica', 'plus', 'premium'])
  membresia: string= '';
}
