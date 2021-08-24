import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserLoginDTO } from './dto/login-dto.dto';
import { UserDTO } from './dto/user-dto.dto';
import { UserDocument, UserSchemaClass } from './schemas/user-schema.schema';
import { UserService } from './user.service';

var phoneToken = require('generate-sms-verification-code');
var generatedToken =0;

var isphonenumberverified = false;

@Controller('userroute')
export class UserController {

constructor(private readonly userService: UserService) {}


@Post('signup')
signUpUser(@Body() gettingUserData: UserDTO): Promise<UserSchemaClass> {
  console.log('isphonenumberverified =>',isphonenumberverified);
  if(isphonenumberverified){
   return this.userService.signUpUser(gettingUserData);
  }
}

@Post('signupotp')  
signUpWithOtp(@Body() body) {
  console.log('BODY',body);
  
    if( generatedToken == body.rnum ){
    isphonenumberverified=true;
    console.log('SUCCESS..OTP MATCHED');    
  }else{
    generatedToken = phoneToken(8, { type: 'number' });
    console.log('YOUR OTP IS: ',generatedToken);
  }
} 

  @Post('login')
  async loginUser(@Body() gettingLoginData: UserLoginDTO): Promise<UserDocument>{   
  return  this.userService.loginUser(gettingLoginData);   
  }

}
