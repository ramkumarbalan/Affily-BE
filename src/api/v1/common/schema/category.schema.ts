import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CategoryDocument = Category & Document;

@Schema({timestamps: true})
export class Category {

    @Prop({ type: Number })
    categoryId: number;

    @Prop()
    name: string;

    @Prop({default: {name: '', childrens: []}})
    childrens: object[];
}

export const categorySchema = SchemaFactory.createForClass(Category);