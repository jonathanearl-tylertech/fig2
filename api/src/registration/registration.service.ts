import { Injectable, NotImplementedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { IdentityService } from 'src/identity/identity.service';


@Injectable()
export class RegistrationService {
  constructor(private idSvc: IdentityService) {}

  async registerUser(email: string, password) {
    const hash = await bcrypt.hash(password, 10);
    await this.idSvc.create({
      password: hash,
      email,
    });
  }

  async isEmailInUse(email: string): Promise<boolean> {
    return (await this.idSvc.findByEmail(email)) !== null;
  }

  async isUsernameInUse(username: string): Promise<boolean> {
    throw new NotImplementedException();
    // return (await this.userSvc.findByUsername(username)) !== null;
  }
}
