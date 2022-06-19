import { CommentDto } from "./comment.dto";

export interface PostDto {
  _id: string;
  profileId: string;
  summary: string;
  imgUrl: string;
  createdAt: Date;
  comments: CommentDto[]
}