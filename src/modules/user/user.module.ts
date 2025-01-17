import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MeController, UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ], //đăng ký schema User trong UserModule, giúp ứng dụng có thể tương tác với MongoDB.
  providers: [UserService],
  controllers: [UserController, MeController],
  exports: [UserService],
})
export class UserModule {}
