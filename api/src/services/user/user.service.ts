import { Injectable } from '@nestjs/common';
import { FigUser, FigUserModel as UserModel } from './user.model';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async create(newUser: Partial<FigUser>) {
    const user = new UserModel({
      ...newUser,
      failedLoginAttempts: 0,
      disabled: false,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
    await user.save();
  }

  async validatePassword(username: string, password: string): Promise<boolean> {
    const user = await UserModel.findOne({ username: username });
    console.log(user);
    const isAuthorized = await bcrypt.compare(password, user.passwordHash);
    console.log({ isAuthorized });
    if (!isAuthorized) {
      user.failedLoginAttempts += 1;
      user.save();
      return false;
    }
    user.lastLogin = new Date();
    user.failedLoginAttempts = 0;
    return true;
  }

  async findByUsername(username: string): Promise<FigUser> {
    return await UserModel.findOne({ username: username }).lean();
  }

  async findByEmail(email: string): Promise<FigUser> {
    return await UserModel.findOne({ email: email }).lean();
  }

  async update(user: FigUser): Promise<FigUser> {
    user.modifiedAt = new Date();
    return await UserModel.findOneAndUpdate(user);
  }
}
