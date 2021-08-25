import { Injectable, Options, Request, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchemaClass } from './schemas/user-schema.schema';

import { ItemService } from 'src/Items/items.services';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Usermodel') private readonly uModel: Model<UserDocument>,
    private readonly itemService: ItemService,
   
  ) {}

  async signUpUser(gettingUserData): Promise<UserSchemaClass> {
    gettingUserData.password = await bcrypt.hash(gettingUserData.password, 10);
    const signUpDataToModel = new this.uModel(gettingUserData);
    return signUpDataToModel.save();
  }

  // getItem(): string {
  //   return 'ITEMS!';
  // }

  async loginUser(user): Promise<any> {

    console.log(` WELCOME , ${user.fname} ${user.lname}`);
    return this.itemService.getItem();

    // response.cookie(name:'jwt',this.jwtservice,Options:{httpOnly:true})   
  }
}
