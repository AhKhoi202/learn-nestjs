import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true }) 
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: 'user' }) // Mặc định role là 'user'
  role: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);
