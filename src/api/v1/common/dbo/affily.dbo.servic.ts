import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable({})
export class AffilyDboService {
  constructor(
    // @InjectModel(PropertyLead.name)
    // private propertyLeadModel: Model<PropertyLeadDocument>
  ) {}

  async create() {
    return "write create db logic"
  }

  async get() {
    return "get db logic"
  }
 
}
