import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from 'src/Items/items.module';
import { UserSchema } from './schemas/user-schema.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ItemModule  ,
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '6000000s'}
    }),
      MongooseModule.forFeature([{name:'Usermodel', schema: UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
