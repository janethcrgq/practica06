import { Injectable } from '@nestjs/common';


 export interface Clase{
    id: number,
    nombre: string
  }

   
  const clases: Clase[]= [{
  id: 1,
  nombre: "yoga"
 }, {
  id: 2,
  nombre: "pilates"
 }]

@Injectable()
export class ClasesService {

  listar(): Clase[]{
    return clases;
  }
  crear(nombre: string): Clase {

    const nueva: Clase= {
      id: clases.length+1,
      nombre: nombre
    }
    
    return nueva;
  }

}


