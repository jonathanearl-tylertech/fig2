import { Comment } from './comment.entity';

export class Post {
  _id: string;
  comments: Comment[];
  profileId: string;
  description: string;
  imgUrl: string;
  createdAt: Date;
  __v: number;
}
