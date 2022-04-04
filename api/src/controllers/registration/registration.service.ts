import { Injectable } from '@nestjs/common';
import { IdentityService } from 'src/services/identity/identity.service';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class RegistrationService {
  constructor(
    private idSvc: IdentityService,
    private userSvc: UserService,
  ) {}

  async registerUser(email: string, password: string, username: string) {
    const identity = await this.idSvc.create(email, password);
    const user = await this.userSvc.create(username);
    await this.idSvc.update(identity.id, { userId: user._id });
  }

  async isEmailInUse(email: string) {
    const user = await this.idSvc.findByEmail(email);
    return user != null;
  }

  async isUsernameInUse(username: string) {
    const user = await this.userSvc.findByUsername(username);
    return user != null;
  }
}
