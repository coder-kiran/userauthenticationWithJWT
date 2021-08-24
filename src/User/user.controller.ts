import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserLoginDTO } from './dto/login-dto.dto';
import { UserDTO } from './dto/user-dto.dto';
import { UserDocument } from './schemas/user-schema.schema';
import { UserService } from './user.service';

var phoneToken = require('generate-sms-verification-code');
var generatedToken =0;

var isphonenumberverified = false;

@Controller('userroute')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('testing')
  getHello(): string {
    return this.userService.getHello();
  }



@Post('signupotp/:rnum')  
signUpWithOtp(@Param() param) {
    if( generatedToken == param.rnum ){
    isphonenumberverified=true;
    console.log('SUCCESS..OTP MATCHED');    
  }else{
    generatedToken = phoneToken(8, { type: 'number' });
    console.log('YOUR OTP IS: ',generatedToken);
  }
}

@Post('signup')
signUpUser(@Body() gettingUserData: UserDTO) {
  console.log('isphonenumberverified =>',isphonenumberverified);
  if(isphonenumberverified){
    this.userService.signUpUser(gettingUserData);
  }
}
 

  @Post('login')
  async loginUser(@Body() gettingLoginData: UserLoginDTO): Promise<UserDocument>{   
  return  this.userService.loginUser(gettingLoginData);   
  }

}
