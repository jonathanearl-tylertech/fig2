export interface IProfile {
  id: String;
  email: String;
  name: String;
  username: String;
  summary: String;
  createdAt: Date;
  modifiedAt: Date;
}

export interface IUpdateProfile {
  name: String;
  summary: String;
}