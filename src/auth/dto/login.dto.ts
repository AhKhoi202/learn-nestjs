import { IsEmail, IsNotEmpty } from 'class-validator';

export class ILoginDTO {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
