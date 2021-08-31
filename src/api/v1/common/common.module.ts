import { HttpModule, Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CategoryDboService } from './dbo/category.dbo.service';
import { ProductDboService } from './dbo/product.dbo.service';
import { Category, categorySchema } from './schema/category.schema';
import {
  ProductInsights,
  productInsightSchema,
} from './schema/product-insights.schema';
import { Products, productSchema } from './schema/product.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Products.name,
        useFactory: async (connection: Connection) => {
          const AutoIncrement = AutoIncrementFactory(connection);
          const schema = productSchema;
          schema.plugin(AutoIncrement, {
            inc_field: 'productId',
            start_seq: 1,
            reference_value: 'products',
          });
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: ProductInsights.name,
        useFactory: async (connection: Connection) => {
          const AutoIncrement = AutoIncrementFactory(connection);
          const schema = productInsightSchema;
          schema.plugin(AutoIncrement, {
            inc_field: '_id',
            start_seq: 1,
            reference_value: 'product_insights',
          });
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: Category.name,
        useFactory: async (connection: Connection) => {
          const AutoIncrement = AutoIncrementFactory(connection);
          const schema = categorySchema;
          schema.plugin(AutoIncrement, {
            inc_field: 'categoryId',
            start_seq: 1,
            reference_value: 'category',
          });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    HttpModule,
  ],
  providers: [CategoryDboService],
  exports: [CategoryDboService],
})
export class CommonModule {}
