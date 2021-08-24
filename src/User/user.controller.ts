import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDTO } from './dto/user-dto.dto';
import { UserService } from './user.service';

var phoneToken = require('generate-sms-verification-code');
var generatedToken = phoneToken(8, { type: 'number' });

@Controller('userroute')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('testing')
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('signup/:rnum')
  signUpUser(@Body() gettingUserData: UserDTO, @Param() param) {
    console.log('your random OTP is : ', generatedToken);
    console.log('Otp you entered', param.rnum);

    if (generatedToken == param.rnum) {
      this.userService.signUpUser(gettingUserData);
    } else {
      console.log('random num not matched');
    }
  }
}
