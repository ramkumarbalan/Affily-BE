import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from '../../module/backoffice/dto/category/category.dto';
import { Category, CategoryDocument } from '../schema/category.schema';

@Injectable({})
export class CategoryDboService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  async create(categoryDto: CategoryDto) {
    return await new this.categoryModel(categoryDto).save();
  }

  async get() {
    return "get db logic"
  }
 
}
