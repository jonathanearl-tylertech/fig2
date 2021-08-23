import PostDto from './post.dto';

export default interface ProfileDto {
  username: string;
  email: string;
  summary: string;
  posts: PostDto[];
}