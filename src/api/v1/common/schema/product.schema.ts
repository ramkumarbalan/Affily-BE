import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Category } from "./category.schema";
import { ProductInsights } from "./product-insights.schema";

export type ProductsDocument = Products & Document;
@Schema({ timestamps: true })
export class Products {

    @Prop({type: Number})
    productId: number;

    @Prop()
    title: string;

    @Prop()
    store: string;
    
    @Prop()
    providerProductId: string;

    @Prop()
    pLink: string;

    @Prop()
    tagId: string;

    @Prop()
    images: [
        {
            link: string;
            position: number;
        }
    ]

    @Prop()
    videoLink: string;

    @Prop()
    affilyRatings: number;

    @Prop()
    originalPrice: number;

    @Prop()
    dealPrice: number;

    @Prop()
    offerPercentage: number;

    @Prop()
    description: number;

    @Prop()
    specs: [
        {
            label: string,
            value: string
        }
    ]

    @Prop({default: false})
    active: boolean;

    @Prop({ type: ProductInsights })
    productInsights: ProductInsights

    @Prop()
    tags: string[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
    category: [Category];

    @Prop()
    seoTags: string[];

    @Prop()
    approved: boolean;
}

export const productSchema = SchemaFactory.createForClass(Products);