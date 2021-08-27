export class Issuers {
  default: string;
}

export class Profile {
  _id: string;
  profileImgUrl: string
  issuers: Issuers
  username: string;
  summary: string;
  createdAt: Date;
  modifiedAt: Date;
  __v: number;
}

