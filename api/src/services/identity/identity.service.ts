import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Identity, IdentityDocument, IdentityType } from './identity.schema';
import { PasswordService } from 'src/services/password.service';
import mongoose from 'mongoose';

@Injectable()
export class IdentityService {
  
  constructor(
    @InjectModel(Identity.name) private db: Model<IdentityDocument>,
    private readonly passwordService: PasswordService,
  ) {}

  create = async (email: string, password: string) => {
    const hash = await this.passwordService.hash(password);
    const result = await this.db.create({
      _id: new mongoose.mongo.ObjectId(),
      email,
      password: hash,
      type: IdentityType.Local,
    });
    console.log({result})
    return result.toObject();
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
