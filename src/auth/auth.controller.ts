import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistroDto, TokenDto } from './dto/auth.dto';
import { UsuarioActual } from './decoradores/usuario-actual.decorator';
import type { PayLoadJwt } from './dominio/usuario';
import { Publico } from './decoradores/publico.decorators';


@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  // @Publico(): sin esto nadie podria registrarse (haria falta un token
  // para conseguir un token).
  @Publico()
  @Post('registro')
  @HttpCode(201)
  registro(@Body() dto: RegistroDto): Promise<TokenDto> {
  return this.auth.registrar(dto);
  }


  @Publico()
  @Post('login')
  @HttpCode(200) // un login no "crea" nada: 200, no 201
  login(@Body() dto: LoginDto): Promise<TokenDto> {
  return this.auth.login(dto); // auth service verifica la contrasenia y devuelve el token
  }


  // Protegida (no tiene @Publico). Regresa lo que venia dentro del token:
  // el servidor no guardo nada, todo viajo en el token.
  @Get('yo')
  yo(@UsuarioActual() usuario: PayLoadJwt) {
  return usuario;
  }
}