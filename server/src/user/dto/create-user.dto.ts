import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*\d).*$/, {
    message: 'Password must have at least 1 number',
  })
  @Matches(/(?=.*\W+).*$/, {
    message: 'Password must have at least 1 special character',
  })
  @Matches(/(?![.\n]).*$/, {
    message: 'The password must not have line break.',
  })
  @Matches(/(?=.*[a-z]).*$/, {
    message: 'Password must have at least 1 lowercase letter',
  })
  @Matches(/(?=.*[A-Z]).*$/, {
    message: 'The password must have at least 1 uppercase letter',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  name: string;

  @IsIn(["USER", "ADMIN"])
  @IsString()
  role: string;
}
