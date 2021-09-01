import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/getsamples')
  sampleNotes() {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    return {
      "fulfillmentMessages": [
        {
          text: {
            text: [
              'Press 1 for book a appointment with ENT specialist',
              'Press 2 for book a appointment with Nephrologists',
              'Press 3 for book a appointment with Pediatricians',
              'Press # for book a relistining'
            ]
          }
        }
      ],
      "source": "BookingIntent"
    }
  }
}
