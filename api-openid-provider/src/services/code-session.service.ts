import { Injectable } from '@nestjs/common';
import { CodeSession } from 'src/interfaces/CodeSession';

// todo: move to redis implementation
@Injectable()
export class CodeSessionService {
  private readonly sessions = {};

  get(sid: string): CodeSession {
    return this.sessions[sid];
  }

  set(sid: string, obj: CodeSession) {
    this.sessions[sid] = obj;
  }

  delete(sid: string) {
    this.sessions[sid] = null;
  }
}
