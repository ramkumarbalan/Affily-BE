import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class ProductInsights {

    @Prop()
    likes: number;

    @Prop()
    views: number;
}

export const productInsightSchema = SchemaFactory.createForClass(ProductInsights);