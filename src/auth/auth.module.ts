import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModuleOptions } from '@nestjs/jwt';

import * as config from 'config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JsonWebTokenStrategy } from './json-web-token.strategy';

const JWT_CONFIG = config.get('jwt');
const JWT_MODULE_OPTIONS: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || JWT_CONFIG.secret,
  signOptions: {
    expiresIn: JWT_CONFIG.expiresIn,
  },
};

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
