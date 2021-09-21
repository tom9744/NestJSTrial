import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { ExtractJwt, Strategy } from 'passport-jwt';
import * as config from 'config';

import { JWTPayload } from './auth.type';
import { UserRepository } from './user.repository';

const JWT_CONFIG = config.get('jwt');

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    /**
     * Provides a secret key which had been used for generating JWT Tokens.
     * Also, defines how to extract JWT Token from HTTP Request.
     */
    super({
      secretOrKey: process.env.JWT_SECRET || JWT_CONFIG.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWTPayload) {
    const { username } = payload;
    const foundUser = await this.userRepository.findOne({ username });

    if (!foundUser) {
      throw new UnauthorizedException('Invalid JWT Token - User not found.');
    }

    return foundUser;
  }
}
