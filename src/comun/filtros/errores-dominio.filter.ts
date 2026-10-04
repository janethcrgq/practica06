import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import type { Request, Response } from 'express';
import { CupoLlenoError, ErrorDominio, HorarioNoEncontradoError, InscripcionDuplicadaError, MiembroNoEncontradoError } from "src/inscripciones/dominio/errores";

@Catch(ErrorDominio)
export class ErrorDominioFilter implements ExceptionFilter{
  catch(error: any, host: ArgumentsHost) {
    const ctx= host.switchToHttp();
    const response= ctx.getResponse<Response>();
    const request= ctx.getRequest<Request>();

    const esNoEncontrado= error instanceof HorarioNoEncontradoError ||error instanceof MiembroNoEncontradoError;
    const esConflicto= error instanceof CupoLlenoError || error instanceof InscripcionDuplicadaError;

    const statusCode= esNoEncontrado ?  404 : esConflicto ? 409 : 500;

    response.status(statusCode).json({
      statusCode,
      message: error.message,
      path: request.url,
      timestamp: new Date().toISOString()


  })


  }
  
}