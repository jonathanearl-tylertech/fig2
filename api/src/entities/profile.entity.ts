export class Issuer {
  ['https://dev-840204.okta.com/oauth2/default']: string;
}

export class Profile {
  _id: string;
  
  issuer: any

  username: string;

  summary: string;

  createdAt: Date;
  
  modifiedAt: Date;
}

