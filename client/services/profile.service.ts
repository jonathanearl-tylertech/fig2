import { ProfileDto } from "../dtos/profile.dto";
import { AuthHelper } from "./auth-helper";

class ProfileService {
  private baseUri: string;

  constructor() {
    this.baseUri = 'http://localhost:3000/api/v1/profile'
  }

  async getMe(): Promise<ProfileDto> {
    const token = await AuthHelper.getToken();
    const options = { headers: { authorization: `Bearer ${token}` } };
    const url = new URL(`${this.baseUri}/me`);
    const response = await fetch(url.toString(), options);
    const result: ProfileDto = await response.json();
    return result;
  }

  async getProfileById(_id: string): Promise<ProfileDto> {
    const token = await AuthHelper.getToken();
    const options = { headers: { authorization: `Bearer ${token}` } };
    const url = new URL(`${this.baseUri}/q`);
    url.searchParams.append('_id', _id);
    const response = await fetch(url.toString(), options);
    const result: ProfileDto = await response.json();
    return result;
  }

  async getProfileByUsername(username: string): Promise<ProfileDto> {
    const token = await AuthHelper.getToken();
    const options = { headers: { authorization: `Bearer ${token}` } };
    const url = new URL(`${this.baseUri}/${username}`);
    const response = await fetch(url.toString(), options);
    const result: ProfileDto = await response.json();
    return result;
  }
}

export default new ProfileService();