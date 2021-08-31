import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from '../schema/product.schema';

@Injectable({})
export class ProductDboService {
  constructor(
    @InjectModel(Products.name)
    private productModel: Model<ProductsDocument>
  ) {}

  async create() {
    return "write create db logic"
  }

  async get() {
    return "get db logic"
  }
 
}
