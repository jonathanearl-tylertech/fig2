import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import
mongoose,
{ Model }
  from 'mongoose';
import {
  Identity,
  IdentityDocument,
  IdentityType
} from 'src/schemas/identity.schema';
import { PasswordService } from 'src/services/password.service';

@Injectable()
export class IdentityService {
  constructor(
    @InjectModel(Identity.name) private identity: Model<IdentityDocument>,
    private readonly pwSvc: PasswordService,
  ) { }

  create = async (email: string, password: string) => {
    const hash = await this.pwSvc.hash(password);
    const result = await this.identity.create({
      _id: new mongoose.mongo.ObjectId(),
      email,
      password: hash,
      type: IdentityType.Local,
    });
    return result.toObject();
  };

  findAll = async () => {
    return await this.identity.find().lean();
  }

  findById = async (id: string) => {
    return await this.identity.findById(id).lean();
  }

  findByEmail = async (email: string) => {
    return await this.identity.findOne({ email }).lean();
  }

  update = async (id: string, doc: Partial<Identity>) => {
    const result = await this.identity.findOneAndUpdate({ id }, doc).lean();
    return result.id;
  }

  remove = async (id: string) => {
    await this.identity.findByIdAndRemove(id);
  }
}
