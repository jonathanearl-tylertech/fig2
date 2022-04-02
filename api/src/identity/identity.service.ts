import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Identity, IdentityDocument } from './identity.schema';
import bcrypt from 'bcrypt';

@Injectable()
export class IdentityService {
  
  constructor(@InjectModel(Identity.name) private db: Model<IdentityDocument>) {}

  create = async (doc: Partial<Identity>) => {
    const result = await this.db.create(doc);
    return result.id;
  };

  findAll = async () => {
    return await this.db.find().lean();
  }

  findById = async (id: string) => {
    return await this.db.findById(id).lean();
  }

  findByEmail = async (email: string) => {
    return await this.db.findOne({ email }).lean();
  }

  update = async (id: string, doc: Identity) => {
    const result = await this.db.findOneAndUpdate({ id }, doc).lean();
    return result.id;
  }

  remove = async (id: string) => {
    await this.db.findByIdAndRemove(id);
  }
}
