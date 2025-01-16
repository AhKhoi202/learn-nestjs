import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from 'src/modules/user/user.service';
import { ILoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getProfile(email);

    if (!pass) {
      throw new UnauthorizedException('username/password không hợp lệ');
    }
    if (!user) return null;
    return user;
  }

  async login(body: ILoginDTO) {
    // Tìm người dùng theo email
    const user = await this.usersService.findOne(body.email);

    if (!user) {
      throw new UnauthorizedException('User is not registered');
    }

    // So sánh mật khẩu đã hash
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: body.email };
    console.log(payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
