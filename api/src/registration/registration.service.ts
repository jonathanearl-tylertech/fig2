import { Dependencies, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserService } from 'src/services/user/user.service';

@Injectable()
@Dependencies(UserService)
export class RegistrationService {
  userSvc: UserService;
  constructor() {
    this.userSvc = new UserService();
  }

  async registerUser(email, username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    await this.userSvc.create({
      username,
      passwordHash,
      email,
    });
  }

  async isEmailInUse(email: string): Promise<boolean> {
    return (await this.userSvc.findByEmail(email)) === null;
  }

  async isUsernameInUse(username: string): Promise<boolean> {
    return (await this.userSvc.findByUsername(username)) === null;
  }
}
