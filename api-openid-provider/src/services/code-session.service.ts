import { Injectable } from '@nestjs/common';
import { CodeSession } from 'src/interfaces/CodeSession';
import { Uuid } from './uuid.service';

// todo: move to redis implementation
@Injectable()
export class CodeSessionService {
  private readonly sessions = {};

  constructor(private readonly uuid: Uuid) {}

  get(code: string): CodeSession {
    return this.sessions[code];
  }

  set(obj: CodeSession) {
    const code = this.uuid.generate();
    this.sessions[code] = obj;
    return code;
  }

  delete(code: string) {
    this.sessions[code] = null;
  }
}
