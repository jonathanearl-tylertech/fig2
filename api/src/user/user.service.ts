import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private db: Model<UserDocument>) { }

  create = async (user: Partial<User>) => {
    return (await this.db.create(user)).id;
  }

  findAll = async () => {
    return await this.db.find().lean();
  }

  findById = async (id: string) => {
    return await this.db.findById(id).lean();
  }

  findByEmail = async (email: string) => {
    return await this.db.findOne({ email }).lean();
  }

  update = async (id: string, user: User) => {
    return (await this.db.findOneAndUpdate({ id }, user)).id;
  };

  remove = async (id: string) => {
    await this.db.findByIdAndRemove(id);
  }
}
