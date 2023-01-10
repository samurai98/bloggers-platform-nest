import { LikesInfo } from '../../../common/types/reactions';

export type ViewComment = {
  id: string;
  content: string;
  userId: string;
  userLogin: string;
  createdAt: string;
  likesInfo: LikesInfo;
};
