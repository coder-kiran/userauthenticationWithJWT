import {
    IsEmail,  
    IsString,
    Length,
    IsNotEmpty,
    Contains,
    IsDate,
    IsMobilePhone,
    IsDateString,  
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
  
    @IsMobilePhone('en-IN')
    readonly phoneno: number;

    @IsDateString()
    readonly dob:  Date;
  }