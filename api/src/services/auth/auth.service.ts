import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcrypt";
import { IdentityModel } from "./auth.model";


@Injectable()
export class AuthService {
  async signIn(username: string, password: string) {
    const userIdentity = await IdentityModel.findOne({ 'username': username });
    const isPasswordValid = await bcrypt.compare(password, userIdentity.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('incorrect username or password');
    }
    userIdentity.lastLogin = new Date();
    userIdentity.failedLoginAttempts = 0;
    await userIdentity.save();
  }

  async register(username: string, password: string, email: string) {
    const userExists = await IdentityModel.findOne({ 'username': username });
    if (userExists) throw new BadRequestException(`username '${username}' is already taken`)

    const passwordHash = await bcrypt.hash(password, 10);
    const identity = new IdentityModel({ 
      username, 
      passwordHash,
      failedLoginAttempts: 0,
      disabled: false,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
    await identity.save();
  }

  async disable(username: string, password: string) {
    const identity = await IdentityModel.findOne({ 'username': username });
    this.validatePasswordHash(password, identity.passwordHash);
    identity.disabled = true;
    identity.modifiedAt = new Date();
    identity.save();
  }

  async validateUsername(username: string) {
    const userIdentity = await IdentityModel.findOne({ 'username': username });
    if (userIdentity) throw new BadRequestException(`username '${username}' already taken`)
  }

  private async validatePasswordHash(password: string, passwordHash: string) {
    const isValid = await bcrypt.compare(password, passwordHash);
    if (!isValid) throw new UnauthorizedException('invalid username or pasword');
  }


}