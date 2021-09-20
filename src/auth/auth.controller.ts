import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResponse } from './auth.type';
import { AuthCredentialsDto } from './DTOs/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthResponse> {
    return this.authService.signIn(authCredentialsDto);
  }
}
