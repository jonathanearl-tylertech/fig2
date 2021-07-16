export interface IProfile {
  _id: String;
  email: String;
  name: String;
  username: String;
  summary: String;
  createdAt?: Date;
  modifiedAt?: Date;
}