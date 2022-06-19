import { Injectable } from '@nestjs/common';
import { UserSession } from 'src/interfaces/UserSession';

// todo: move to redis implementation
@Injectable()
export class UserSessionService {
  private readonly sessions = {};

  get(sid: string): UserSession {
    const session = this.sessions[sid] as UserSession;
    return this.sessions[sid] ?? {};
  }

  set(sid: string, obj: UserSession) {
    this.sessions[sid] = obj;
  }

  delete(sid: string) {
    this.sessions[sid] = null;
  }
}
