import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { EmojiGeneratorService } from 'src/services/emoji-generator.service';

@Injectable()
export class UserService {
  constructor(
    private readonly emoji: EmojiGeneratorService,
    @InjectModel(User.name) private userDb: Model<UserDocument>
  ) { }

  create = async (username: string) => {
    const user = await this.userDb.create({
      _id: new mongoose.mongo.ObjectId(),
      icon: this.emoji.generate(),  
      username,
    });
    return user.toObject();
  }

  findAll = async () => {
    return await this.userDb.find().lean();
  }

  findById = async (id: string) => {
    return await this.userDb.findById(id).lean();
  }

  findByUsername = async (username: string) => {
    return await this.userDb.findOne({ username }).lean();
  }

  update = async (id: string, user: User) => {
    await this.userDb.findOneAndUpdate({ id }, user);
  };

  remove = async (id: string) => {
    await this.userDb.findByIdAndRemove(id);
  }
}
