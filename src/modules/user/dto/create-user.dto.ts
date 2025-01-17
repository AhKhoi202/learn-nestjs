import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(
    /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(09|03|08)\d{8}$/, {
    message: 'Phone number must have 10 digits and start with 09, 03, or 08',
  })
  phone: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: 'Role must be admin or user' })
  role: string;
}
