//Es enum (y no union de textos) porque existe en
// tiempo de ejecucion
export enum Rol{
  miembro= 'miembro',
  entrenador= 'entrenador',
  admin= 'admin'
}

export interface Usuario{
  id: number,
  correo: string,
  passwordHash: string,
  rol: Rol,
  miembroId: number | null; // el miembro del gimnasio que es; null si es personal
  creadoEn: Date;
}

// Lo que se manda a guardar: todo menos lo que pone el repositorio
export type NuevoUsuario= Omit<Usuario, 'id' | 'creadoEn'>

// Lo que viaja DENTRO del token. NO va cifrado: cualquiera lo lee en
// jwt.io, asi que aqui no va nada secreto (ni el hash).
export interface PayLoadJwt{
  sub: number, 
  correo: string,
  rol: Rol,
  miembroId: number | null; 
}
