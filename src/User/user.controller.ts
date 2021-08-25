import { Body, Controller, Get, Param, Post, Query, Request, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemService } from 'src/Items/items.services';
import { UserLoginDTO } from './dto/login-dto.dto';
import { UserDTO } from './dto/user-dto.dto';
import { UserDocument, UserSchemaClass } from './schemas/user-schema.schema';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

var phoneToken = require('generate-sms-verification-code');
var generatedToken = 0;

var isphonenumberverified = false;

@Controller('userroute')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly itemService: ItemService,
    private jwtservice: JwtService,
    @InjectModel('Usermodel') private readonly uModel: Model<UserDocument>,
  ) {}

  @Post('signup')
  signUpUser(@Body() gettingUserData: UserDTO): Promise<UserSchemaClass> {
    console.log('isphonenumberverified =>', isphonenumberverified);
    if (isphonenumberverified) {
      return this.userService.signUpUser(gettingUserData);
    }
  }

  @Post('signupotp')
  signUpWithOtp(@Body() body) {
    if (generatedToken == body.rnum) {
      isphonenumberverified = true;
      console.log('SUCCESS..OTP MATCHED');
      return 'Success.Please enter your details';
    } else {
      generatedToken = phoneToken(8, { type: 'number' });
      console.log('YOUR OTP IS: ', generatedToken);
      return generatedToken;
    }
  }
@Post('loginn')
async login(@Request() req) {
 await console.log('REQUEST',req);
  
  return req.user;
}


  @Post('login')
  async loginUser(@Body() gettingLoginData): Promise<any> {
    const user = await this.uModel.findOne({
      email: gettingLoginData.email,
    });

    if (user) {
      console.log('<<--   MAIL ID CONFIRMED    -->>');
      const items = await bcrypt
        .compare(gettingLoginData.password, user.password)
        .then((status) => {
          if (status) {
            console.log('<<--  LOGGED IN SUCCESSFULLY   -->>');

            // preparing JWT
             const payload = {username:user.fname, sub: user._id};
             
            var access_token= this.jwtservice.sign(payload)
            console.log(access_token);
            
             
            return this.userService.loginUser(user);
          
            
          } else {
            console.log('<<--  OOPs..! ENTERED PASSWORD IS WRONG  -->>');
          }
        });
      return items;
    } else {
      console.log('<<--  NO SUCH USER   -->>');
      return 'No such user';
    }

    return this.userService.loginUser(gettingLoginData);
  }

  @Get('item')
  getItem() {
    return this.itemService.getItem();
  }
}
