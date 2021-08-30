import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScraperModule } from '../module/scraper/scraper.module';
import { AffilyDboService } from './dbo/affily.dbo.servic';
import { Category, categorySchema } from './schema/category.schema';
import { ProductInsights, productInsightSchema } from './schema/product-insights.schema';
import { Products, productSchema } from './schema/product.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Products.name,
                schema: productSchema,
                collection: "products",
            },
            {
                name: ProductInsights.name,
                schema: productInsightSchema,
                collection: "product_insights",
            },
            {
                name: Category.name,
                schema: categorySchema,
                collection: "category",
            }
        ]),
        HttpModule,
        ScraperModule
    ],
    providers: [AffilyDboService],
    exports: [AffilyDboService]
})
export class CommonModule {}
