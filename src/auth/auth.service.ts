import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './DTOs/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const foundUser = await this.userRepository.findOne({ username });

    if (!foundUser) {
      throw new UnauthorizedException('User not Found.');
    }

    const isIdentical = await bcrypt.compare(password, foundUser.password);

    if (!isIdentical) {
      throw new UnauthorizedException('Wrong Password.');
    }

    return `Welcome back, ${username}`;
  }
}
