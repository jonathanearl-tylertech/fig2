import { PostDto } from "../dtos/post.dto";
import { AuthHelper } from "./auth-helper";
class PostService {
  private baseUri: string;

  constructor() {
    this.baseUri = 'http://localhost:3000/api/v1/post'
  }

  async addComment(_id: string, message: string) {
    const token = await AuthHelper.getToken();
    const options = { 
      method: 'POST', 
      headers: { 
        authorization: `Bearer ${token}`,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ message })
    };
    const url = new URL(`${this.baseUri}/${_id}/comment`);
    await fetch(url.toString(), options);
  }

  async getPost(_id: string) {
    const token = await AuthHelper.getToken();
    const options = { 
      headers: { 
        authorization: `Bearer ${token}`,
        accept: 'application/json',
      } 
    };
    const url = new URL(`${this.baseUri}/${_id}`);
    const response = await fetch(url.toString(), options);
    const result: PostDto = await response.json();
    return result;
  }

  async search(q: Partial<{profileId: string, username: string}>) {
    const token = await AuthHelper.getToken();
    const options = { headers: { authorization: `Bearer ${token}` } };
    const url = new URL(`${this.baseUri}/q`);
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