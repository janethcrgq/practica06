import { IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

// Validacion minima a mano. En la Sesion 9 (Blindar la API) la hace
// ValidationPipe.
export class CrearClaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  nombre: string= "";
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  descripcion: string= "";
}
