import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchemaClass } from './schemas/user-schema.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Usermodel') private readonly uModel: Model<UserDocument>,
  ) {}

  async signUpUser(gettingUserData): Promise<UserSchemaClass> {
    gettingUserData.password = await bcrypt.hash(gettingUserData.password, 10);
    const signUpDataToModel = new this.uModel(gettingUserData);
    return signUpDataToModel.save();
  }

  async loginUser(gettingLoginData): Promise<string> {
    console.log(gettingLoginData)
    const user = await this.uModel.findOne({
      email: `${gettingLoginData.email}`,
    });

    if (user) {
      console.log('<<--   MAIL ID CONFIRMED    -->>');
      await bcrypt
        .compare(gettingLoginData.password, user.password)
        .then((status) => {
          if (status) {
            console.log('<<--  LOGGED IN SUCCESSFULLY   -->>');
            console.log(` WELCOME , ${user.fname} ${user.lname}`);
          } else {
            console.log('<<--  OOPs..! ENTERED PASSWORD IS WRONG  -->>');
          }
        });
    } else {
      console.log('<<--  NO SUCH USER   -->>');
      return 'No such user'
    }
  
  }
}
