import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JWT_MODULE_OPTIONS } from 'src/configs/json-web-token.private';
import { JsonWebTokenStrategy } from './json-web-token.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(JWT_MODULE_OPTIONS),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JsonWebTokenStrategy],
  // Allow other modules to use the following modules and services.
  exports: [JsonWebTokenStrategy, PassportModule],
})
export class AuthModule {}
