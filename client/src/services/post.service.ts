import { PostDto } from "../dtos/post.dto";
import { AuthHelper } from "./auth-helper";
const { REACT_APP_FIG_BASE_API } = process.env;

class PostService {
  async getPost(_id: string) {
    const token = await AuthHelper.getToken();
    const options = { headers: { authorization: `Bearer ${token}` } };
    const url = new URL(`${REACT_APP_FIG_BASE_API}/post/${_id}`);
    const response = await fetch(url.toString(), options);
    const result: PostDto = await response.json();
    return result;
  }

  async search(q: Partial<{profileId: string, username: string}>) {
    const token = await AuthHelper.getToken();
    const options = { headers: { authorization: `Bearer ${token}` } };
    const url = new URL(`${REACT_APP_FIG_BASE_API}/post/q`);
    if(q.profileId)
      url.searchParams.append('profileId', q.profileId)
    if(q.username)
      url.searchParams.append('username', q.username)
    const response = await fetch(url.toString(), options);
    const result: PostDto[] = await response.json();
    return result;
  }
}

export default new PostService();