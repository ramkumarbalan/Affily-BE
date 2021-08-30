import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Category {

    @Prop()
    id: number;

    @Prop()
    name: string;

    @Prop()
    childrens: object[];
}

export const categorySchema = SchemaFactory.createForClass(Category);