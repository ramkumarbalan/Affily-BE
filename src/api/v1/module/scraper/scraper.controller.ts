import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {

    constructor(
        private readonly scraperService: ScraperService
    ) {

    }

    @Get('')
    healthCheck() {
        return 'scraper module work.'
    }

    @Post('/')
    async scrape(@Body() body) {
        return await this.scraperService.postToTelegram(body)
    }
}
