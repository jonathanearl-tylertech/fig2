import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Identity, IdentityDocument } from './identity.schema';

@Injectable()
export class IdentityService {
  constructor(@InjectModel(Identity.name) private db: Model<IdentityDocument>) {}

  create = async (identity: Partial<Identity>): Promise<string> => {
    const user = await this.db.create(identity);
    return user.id;
  }

  findAll = async () => {
    const users = await this.db.find().lean();
    return users;
  }

  findById = async (id: string) => {
    const user = await this.db.findById(id).lean();
    return user;
  }

  findByEmail = async (email: string) => {
    const user = await this.db.findOne({ email }).lean();
    return user;
  }

  update = async (id: string, identity: Identity): Promise<string> => {
    const user = await this.db.findOneAndUpdate({ id }, identity);
    return user.id;
  }

  remove = async (id: string): Promise<string> => {
    const user = await this.db.findByIdAndRemove(id);
    return user.id;
  }
}
