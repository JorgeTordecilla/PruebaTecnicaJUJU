import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Logearse en el sistema' })
  @ApiResponse({
    status: 200,
    description: 'Login completo',
  })
  @ApiBody({ type: UserDto })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Renovar el token' })
  @ApiResponse({
    status: 200,
    description: 'new Token',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('renewToken')
  async renewToken(@Request() req) {
    return this.authService.renewToken(req.user.accessToken);
  }
}
