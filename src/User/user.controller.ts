import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from './dto/user-dto.dto';
import { UserService } from './user.service';

@Controller('userroute')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('signup')
  @Post()
    signUpUser(@Body() gettingUserData: UserDTO) {
       this.userService.signUpUser(gettingUserData);
    }
}
