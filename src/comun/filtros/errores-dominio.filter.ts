import { ArgumentsHost, Catch, ExceptionFilter, Logger, HttpStatus } from "@nestjs/common";
import type { Request, Response } from 'express';
import { CupoLlenoError, ErrorDominio, HorarioNoEncontradoError, InscripcionDuplicadaError, MiembroNoEncontradoError } from "src/inscripciones/dominio/errores";


//// Atrapa ErrorDeDominio y TODAS sus hijas. Los demas errores (un 400 del
// ValidationPipe, un NotFoundException) siguen su camino normal.
@Catch(ErrorDominio)
export class DominioExceptionFilter implements ExceptionFilter{

  //// Todo lo que escriba sale en la consola con la etiqueta [Dominio].
  private readonly logger= new Logger('Dominio');


  //// Decide el codigo HTTP segun el tipo de error.
  private codigoPara(error: ErrorDominio): number{
    if(error instanceof HorarioNoEncontradoError || error instanceof MiembroNoEncontradoError){
      return HttpStatus.NOT_FOUND;
    }

    if(error instanceof CupoLlenoError || error instanceof InscripcionDuplicadaError){
      return HttpStatus.CONFLICT;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
  
 //// Nest llama a este metodo cuando alguien lanza un ErrorDeDominio.
  catch(error: ErrorDominio, host: ArgumentsHost) {


    const ctx= host.switchToHttp(); // estamos en HTTP (no WebSockets)
    const response= ctx.getResponse<Response>(); // la respuesta de Express
    const request= ctx.getRequest<{url: string; method: string}>(); //la peticion
    const estado= this.codigoPara(error);

    //en la consola
    this.logger.warn(`${request.method} ${request.url} -> ${estado} ${error.constructor.name}`);

  
    //// Todos los errores de dominio responden con la MISMA forma. Asi el
    // frontend los maneja en un solo lugar.
    response.status(estado).json({
      statusCode: estado,
      error: error.constructor.name, //el nombre de la clase como cupo lleno error
      message: error.message, //el msj que se puso en el constructor
      path: request.url,
      timestamp: new Date().toISOString()


  })


  }
  
}