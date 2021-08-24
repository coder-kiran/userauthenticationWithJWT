import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  Contains,
  IsDate,
  IsDateString,
} from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = UserSchemaClass & Document;

@Schema()
export class UserSchemaClass {

  @IsString()
  @IsNotEmpty()
  @Prop()
  readonly fname: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  readonly lname: string;

  @IsEmail()
  @Prop()
  readonly email: string;

  @Length(5, 10)
  @Contains('#' && '*' && '@')
  @Prop()
  readonly password: string;

  @Length(10)
  @Prop()
  readonly phoneno: number;

  @IsDateString()
  @Prop()
  readonly dob: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);
