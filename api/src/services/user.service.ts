import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { EmojiGeneratorService } from 'src/services/emoji-generator.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private user: Model<UserDocument>
  ) { }

  create = async (username: string, icon: string) => {
    const user = await this.user.create({
      _id: new mongoose.mongo.ObjectId(),
      icon,
      username,
    });
    return user.toObject();
  }

  findAll = async () => {
    return await this.user.find().lean();
  }

  findById = async (id: string) => {
    return await this.user.findById(id).lean();
  }

  findByUsername = async (username: string) => {
    return await this.user.findOne({ username }).lean();
  }

  update = async (id: string, user: Partial<User>) => {
    await this.user.findOneAndUpdate({ id }, user);
  };

  remove = async (id: string) => {
    await this.user.findByIdAndRemove(id);
  }
}
