import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ItemService } from 'src/Items/items.services';
import { UserLoginDTO } from './dto/login-dto.dto';
import { UserDTO } from './dto/user-dto.dto';
import { UserDocument, UserSchemaClass } from './schemas/user-schema.schema';
import { UserService } from './user.service';

var phoneToken = require('generate-sms-verification-code');
var generatedToken =0;

var isphonenumberverified = false;

@Controller('userroute')
export class UserController {

constructor(private readonly userService: UserService,private readonly itemService: ItemService) {}


@Post('signup')
signUpUser(@Body() gettingUserData: UserDTO): Promise<UserSchemaClass> {
  console.log('isphonenumberverified =>',isphonenumberverified);
  if(isphonenumberverified){
   return this.userService.signUpUser(gettingUserData);
  }
}

@Post('signupotp')  
signUpWithOtp(@Body() body) {
  
    if( generatedToken == body.rnum ){
    isphonenumberverified=true;
    console.log('SUCCESS..OTP MATCHED');
    return 'Success.Please enter your details'    
  }else{
    generatedToken = phoneToken(8, { type: 'number' });
    console.log('YOUR OTP IS: ',generatedToken);
    return generatedToken;
  }
 
} 

  @Post('login')
  async loginUser(@Body() gettingLoginData): Promise<string>{   
  return  this.userService.loginUser(gettingLoginData);   
  }

  @Get('item')
  getItem() {
    return this.itemService.getItem()
  }

}
