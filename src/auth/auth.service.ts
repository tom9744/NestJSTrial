import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './DTOs/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { AuthResponse } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<AuthResponse> {
    const { username, password } = authCredentialsDto;
    const foundUser = await this.userRepository.findOne({ username });

    if (!foundUser) {
      throw new UnauthorizedException('User not Found.');
    }

    const isIdentical = await bcrypt.compare(password, foundUser.password);

    if (!isIdentical) {
      throw new UnauthorizedException('Wrong Password.');
    }

    const payload = { username, role: 'user' };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
