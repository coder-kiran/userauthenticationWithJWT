import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user-schema.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
      MongooseModule.forFeature([{name:'Usermodel', schema: UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
