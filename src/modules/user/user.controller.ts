import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  // Tạo người dùng mới
  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard) //Chỉ cho phép truy cập nếu token JWT hợp lệ.
  @Get()
  async listUsers(): Promise<User[]> {
    return this.usersService.listUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email') //test http://localhost:8080/api/v1/user/email
  async getProfile(@Param('email') email: string): Promise<User | null> {
    return this.usersService.getProfile(email);
  }
}
