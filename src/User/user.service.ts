import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchemaClass } from './schemas/user-schema.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Usermodel') private readonly uModel: Model<UserDocument>,
  ) {}

  getHello(): string {
    return 'Hello User!';
  }

  async signUpUser(gettingUserData): Promise<UserSchemaClass> {
    const signUpDataToModel = new this.uModel(gettingUserData);
    console.log(signUpDataToModel);
    return signUpDataToModel.save();
  }
  
}
