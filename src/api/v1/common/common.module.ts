import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AffilyDboService } from './dbo/affily.dbo.servic';

@Module({
    imports: [
        // MongooseModule.forFeature([
        //     { name: "collection name replace", schema: "schema name replace" },
        //   ]),
        HttpModule
    ],
    providers: [AffilyDboService],
    exports: [AffilyDboService]
})
export class CommonModule {}
