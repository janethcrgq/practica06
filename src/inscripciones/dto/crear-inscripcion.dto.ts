import { IsInt } from "class-validator";

export class CrearInscripcionDto {
  @IsInt()
  horarioId: number= 0;
  @IsInt()
  miembroId: number= 0;
}
