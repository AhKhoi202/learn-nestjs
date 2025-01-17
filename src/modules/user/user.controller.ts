import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/guards/roles/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  // Tạo người dùng mới
  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard) // Bảo vệ bằng JWT và kiểm tra role
  @Roles('admin') // Chỉ role 'admin' mới được phép //Chỉ cho phép truy cập nếu token JWT hợp lệ.
  @Get()
  async listUsers(): Promise<User[]> {
    return this.usersService.listUsers();
  }
  //cái này phải ở trướcc @Get(':email')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Req() req) {
    console.log('User from req.user:', req.user); // Kiểm tra req.user
    const email = req.user.email; // Lấy email từ payload trong token
    return this.usersService.getProfile(email);
  }

  //cái này phải ở sau  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @Get(':email') //test http://localhost:8080/api/v1/user/email
  async getProfile(@Param('email') email: string): Promise<User | null> {
    return this.usersService.getProfile(email);
  }
}

@Controller('me')
export class MeController {
  constructor(private readonly usersService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Req() req) {
    const email = req.user.email;
    return this.usersService.getProfile(email);
  }
}
