import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  //tao user
  async createUser(
    name: string,
    password: string,
    email: string,
    phone: string,
  ): Promise<User> {
    const newUser = new this.userModel({ name, password, email, phone });
    return newUser.save();
  }

  async listUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getProfile(name: string): Promise<User | null> {
    return this.userModel.findOne({ name }).exec();
  }
}
