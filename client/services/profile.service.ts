import { ProfileDto } from "../dtos/profile.dto";

class ProfileService {
  private baseUri: string;

  constructor() { this.baseUri = 'http://localhost:3000/api/v1/profile'; }

  async getProfileById(id: string): Promise<ProfileDto> {
    const url = new URL(`${this.baseUri}/${id}`);
    const response = await fetch(url.toString(), { method: 'GET' });
    const result: ProfileDto = await response.json();
    return result;
  }

  async getProfileByUsername(username: string): Promise<ProfileDto> {
    const url = new URL(`${this.baseUri}/${username}`);
    const response = await fetch(url.toString());
    const result: ProfileDto = await response.json();
    return result;
  }
}

export default new ProfileService();