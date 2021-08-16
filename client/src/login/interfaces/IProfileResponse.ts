import IProfile from "./IProfile";

export default interface IProfileResponse {
  isAuthenticated: boolean;
  profile: IProfile,
}