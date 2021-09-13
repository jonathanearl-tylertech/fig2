import { ProfileDto } from "../dtos/profile.dto";
import { AuthHelper } from "./auth-helper";
const { REACT_APP_FIG_BASE_API } = process.env;

class ProfileService {
  async getProfileById(_id: string): Promise<ProfileDto> {
    const token = await AuthHelper.getToken();
    const options = { headers: { authorization: `Bearer ${token}` } };
    const url = new URL(`${REACT_APP_FIG_BASE_API}/profile/q`);
    url.searchParams.append('_id', _id);
    const response = await fetch(url.toString(), options);
    const result: ProfileDto = await response.json();
    return result;
  }

  async getProfileByUsername(username: string): Promise<ProfileDto> {
    const token = await AuthHelper.getToken();
    const options = { headers: { authorization: `Bearer ${token}` } };
    const url = new URL(`${REACT_APP_FIG_BASE_API}/profile/${username}`);
    const response = await fetch(url.toString(), options);
    const result: ProfileDto = await response.json();
    return result;
  }
}

export default new ProfileService();