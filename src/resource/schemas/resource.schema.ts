import { Prop ,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/auth/schemas/user.schema";



@Schema({
    timestamps: true
})

export class Resource {

    @Prop()
    name: String;

    @Prop()
    secondKey: String;

    @Prop()
    thirdKey: String

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user: User
}

export const ResourceSchema = SchemaFactory.createForClass(Resource)