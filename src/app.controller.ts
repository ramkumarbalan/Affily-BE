import { Controller, Get, Post, Req } from '@nestjs/common';
import { isNumber } from 'class-validator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/dialogflow')
  sampleNotes(@Req() req) {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', Number(req.body.queryResult.parameters.user_input))
    const dials = [1, 2, 3, 4]
    if(req.body.queryResult.parameters.booking_intent_keyword) {
      return {
        fulfillmentText: `Press 1 for book a appointment with ENT specialist   
                  Press 2 for book a appointment with Nephrologists   
                  Press 3 for book a appointment with Pediatricians  
                  Press # for book a relistining`,
        source: 'BookingIntent'
      }
    } else if(req.body.queryResult.parameters.user_input){
      if(Number(req.body.queryResult.parameters.user_input)) {
        if(dials.includes(Number(req.body.queryResult.parameters.user_input))) {
          return {
            fulfillmentText: `Thanks for your patients, You have selected option ${Number(req.body.queryResult.parameters.user_input)} and We have scheduled an appointment with our consultant, You will receive a appointment link through you mobile SMS shortly. Have a good day.`,
            source: 'UserSelection'
          }
        } else {
          return {
            fulfillmentText: `Sorry. Please provide valid input.`,
            source: 'UserSelection'
          }
        }
      }
    }
  }
}
