import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = UserSchemaClass & Document;

@Schema()
export class UserSchemaClass{

    @Prop()
    fname: string;

    @Prop()
    lname: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phoneno: number;

    // Date
}

export const UserSchema =  SchemaFactory.createForClass(UserSchemaClass);