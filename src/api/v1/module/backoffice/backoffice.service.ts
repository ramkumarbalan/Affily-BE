import { Injectable } from '@nestjs/common';
import { CategoryDboService } from '../../common/dbo/category.dbo.service';
import { CategoryDto } from './dto/category/category.dto';

@Injectable()
export class BackofficeService {
    constructor(
        private readonly categoryDtoService: CategoryDboService
    ) {

    }

    async createCategory(categoryDto: CategoryDto) {
        return await this.categoryDtoService.create(categoryDto);
    }
}
