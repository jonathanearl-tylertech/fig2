import { Injectable } from '@nestjs/common';
import { UserSession } from 'src/interfaces/UserSession';
import { Uuid } from './uuid.service';

// todo: move to redis implementation
@Injectable()
export class UserSessionService {
  private readonly sessions = {};

  constructor(private readonly uuid: Uuid) {}

  get(sid: string): UserSession {
    const session = this.sessions[sid] as UserSession;
    return this.sessions[sid] ?? {};
  }

  set(obj: UserSession) {
    const sid = this.uuid.generate();
    this.sessions[sid] = obj;
    return sid;
  }

  delete(sid: string) {
    this.sessions[sid] = null;
  }
}
