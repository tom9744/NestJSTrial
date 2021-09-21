import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthResponse } from './auth.type';
import { AuthCredentialsDto } from './DTOs/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

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

  /**
   * A Temporary route handler for testing authentication.
   * @param user User Information
   * @returns User Information except for passwrod
   */
  @Post('/testAuth')
  @UseGuards(AuthGuard())
  testAuth(@GetUser() user: User): { id: number; username: string } {
    const userInfoWithoutPassword = {
      id: user.id,
      username: user.username,
    };

    return userInfoWithoutPassword;
  }
}
