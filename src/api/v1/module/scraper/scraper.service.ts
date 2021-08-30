import { Injectable } from '@nestjs/common';
import { ErrorMessageEnum } from '../../common/enum/error-message.enum';
const cheerio = require('cheerio');
var request = require("request");

@Injectable()
export class ScraperService {
    constructor() {}

    async postToTelegram(reqBody) {
        const result: any = await new Promise(function (resolve, reject) { 
         request({uri: reqBody.url}, 
                function(error, response, body) {
                    if(body) {
                        const $ = cheerio.load(body);
                        const productName = $('#productTitle').text().trim().replace("&","and").replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
                        console.log(productName);
                        const productMRP = $('.priceBlockStrikePriceString').text().trim().replace( /[^\d\.]*/g, '');
                        console.log(productMRP);
                        let productImage = $('#imgTagWrapperId img').attr('data-old-hires');
                        if(!productImage) {
                          productImage = $('#imgTagWrapperId img').attr('src');
                        }
                        console.log(productImage);
                        const price = $('.priceBlockDealPriceString').text() ? $('.priceBlockDealPriceString').text() : $('.priceBlockBuyingPriceString').text();
                        const productDealPrice = `${price}`.replace( /[^\d\.]*/g, '');
                        console.log(productDealPrice);
                        let productRating = $('.reviewCountTextLinkedHistogram').attr('title');
                        console.log(productRating);
                        let productDescription = $('#productDescription p').text().trim();
                        console.log(productDescription);
                        let productSavingPrice = $('.priceBlockSavingsString').text().trim();
                        console.log(productSavingPrice);
                        let amazonProdutId = $('#all-offers-display-params').attr('data-asin')
                        let tagId = 'bestdealst0d4-21'
                        if(productRating) {
                            const obj = {
                                pTitle : productName,
                                providerType: reqBody.provider,
                                originalPrice: productMRP,
                                dealPrice: productDealPrice,
                                productImages: [{
                                    link: productImage,
                                    position: 1
                                }],
                                productId: amazonProdutId,
                                store: 'Amazon',
                                url: `https://www.amazon.in/dp/${amazonProdutId}?tag=${tagId}`
                            }
                            resolve({data: obj, error: null})
                        } else {
                            reject({data: null, error: ErrorMessageEnum.NO_STAR_RATING})
                        }

                        /*const token =   '1809369384:AAFU7ZebkbMRhtQOUZRn4dw-fafjdU8sh9c';
                        const chatId = -1001521015325
                        const uri = encodeURI(`chat_id=${chatId}&photo=${productImage}&caption=\n\n\u{1F31F}\u{0020}${productName}\n\n\u{2705}\u{0020}${productDealPrice}\n\n\u{274C}\u{0020}${productMRP}\n\n\u{1F6D2}\u{0020}${reqBody.url}`)
                        const url = `https://api.telegram.org/bot${token}/sendPhoto?${uri}`
                          if(productRating) {
                           console.log(url);
                            request(url, function (error, response, body) {
                                console.error('error:', error); // Print the error if one occurred
                                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                                console.log('body:', body); // Print the HTML for the Google homepage.
                            });            
                            console.log('DONE')
                          } else {
                            console.log('No Ratings') 
                          } */
                        } 
                         else {
                            reject({data: null, error: ErrorMessageEnum.HTML_NOT_LOADED})
                        }
            });   
        }); 
        if(!result.error) {
            return result.data;
        }
        return result.error;
    }

}
