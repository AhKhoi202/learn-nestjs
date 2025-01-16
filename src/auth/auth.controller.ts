import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { ILoginDTO } from './dto/login.dto';
import { UserService } from 'src/modules/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  // @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() body: ILoginDTO) {
    console.log('Inside login controller', body);
    return this.authService.login(body);
  }
}
