import {
    IsEmail,  
    IsString,
    Length,
    IsNotEmpty,
    Contains,  
  } from 'class-validator';
  
  export class UserDTO {
    @IsString()
    @IsNotEmpty()
    readonly fname: string;
  
    @IsString()
    @IsNotEmpty()
    readonly lname: string;
  
    @IsEmail()
    readonly email?: string;
  
    @Length(5, 10)
    @Contains('#' && '*' && '@')
    readonly password: string;
  
    @Length(10)
    readonly phoneno: number;
  }