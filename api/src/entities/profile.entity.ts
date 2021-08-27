export class Issuers {
  default: string;
}

export class Profile {
  _id: string;
  issuers: Issuers
  username: string;
  summary: string;
  createdAt: Date;
  modifiedAt: Date;
}

