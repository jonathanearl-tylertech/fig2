import { Injectable } from '@nestjs/common';
import { UserContext, UserModel } from './models/user.model';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async create(newUser: Partial<UserModel>) {
    const user = new UserContext({
      ...newUser,
      failedLoginAttempts: 0,
      disabled: false,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
    await user.save();
  }

  async validatePassword(username: string, password: string): Promise<boolean> {
    const user = await UserContext.findOne({ username: username });
    if (!user) return false;
    const isAuthorized = await bcrypt.compare(password, user.passwordHash);
    if (!isAuthorized) {
      user.failedLoginAttempts += 1;
      user.save();
      return false;
    }
    user.lastLogin = new Date();
    user.failedLoginAttempts = 0;
    return true;
  }

  async findByUsername(username: string): Promise<UserModel> {
    return await UserContext.findOne({ username: username }).lean();
  }

  async findByEmail(email: string): Promise<UserModel> {
    return await UserContext.findOne({ email: email }).lean();
  }

  async update(user: UserModel): Promise<UserModel> {
    user.modifiedAt = new Date();
    return await UserContext.findOneAndUpdate(user);
  }
}
