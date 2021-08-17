import IProfile from "../models/IProfile";
import ICreateProfileRequest from "../models/ICreateProfileRequest";
import IUpdateProfile from "../models/IUpdateProfileRequest";

export default interface IProfileService {
  GetAll(): Promise<IProfile[]>;
  Get(username: string): Promise<IProfile | undefined>;
  Create(createProfileRequest: ICreateProfileRequest): Promise<IProfile>;
  ImportMock(): Promise<undefined>;
  Update(username: string, updateProfile: IUpdateProfile): Promise<IProfile | undefined>;
}