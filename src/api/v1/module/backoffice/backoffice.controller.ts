import { Body, Controller, Post } from '@nestjs/common';
import { BackofficeService } from './backoffice.service';
import { CategoryDto } from './dto/category/category.dto';

@Controller('backoffice')
export class BackofficeController {

    constructor(
        private readonly backofficeService: BackofficeService
    ) {}

    @Post('category')
    async createCategory(@Body() categoryDto: CategoryDto) {
        return await this.backofficeService.createCategory(categoryDto)
    }

}
