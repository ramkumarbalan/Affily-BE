import { HttpModule, Module } from '@nestjs/common';
import { ScraperModule } from '../module/scraper/scraper.module';
import { AffilyDboService } from './dbo/affily.dbo.servic';

@Module({
    imports: [
        // MongooseModule.forFeature([
        //     { name: "collection name replace", schema: "schema name replace" },
        //   ]),
        HttpModule,
        ScraperModule
    ],
    providers: [AffilyDboService],
    exports: [AffilyDboService]
})
export class CommonModule {}
