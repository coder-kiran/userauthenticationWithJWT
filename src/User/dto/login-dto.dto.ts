import {
  IsEmail,
  IsString,
  Length,
  IsNotEmpty,
  Contains,
} from 'class-validator';

export class UserLoginDTO {

  readonly email: string;
  readonly password: string;
  
}
