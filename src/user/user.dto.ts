import { UserType } from './user.types';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  type: UserType;
}
