import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // Tạo người dùng mới
  @Post('create') // Kết hợp với 'users' sẽ tạo ra '/api/v1/users/create'
  async createUser(
    @Body('name') name: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
  ) {
    return this.userService.createUser(name, password, email, phone);
  }
  @Get()
  async listUsers(): Promise<User[]> {
    return this.userService.listUsers();
  }
  @Get(':name') //test http://localhost:8080/api/v1/user/name
  async getProfile(@Param('name') name: string): Promise<User | null> {
    return this.userService.getProfile(name);
  }
}
