import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProductInsightsDocument = ProductInsights & Document;
@Schema({timestamps: true})
export class ProductInsights {

    @Prop({type: Number})
    _id: number;

    @Prop()
    likes: number;

    @Prop()
    views: number;
}

export const productInsightSchema = SchemaFactory.createForClass(ProductInsights);