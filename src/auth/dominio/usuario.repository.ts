import { NuevoUsuario, Usuario } from "./usuario";

//interfaz mas token
export interface UsuarioRepository{
  
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  guardar(nuevo: NuevoUsuario): Promise<Usuario>;
}
// La interfaz se borra al compilar, por eso se inyecta con este texto.
export const USUARIO_REPOSITORY= 'USUARIO_REPOSITORY';