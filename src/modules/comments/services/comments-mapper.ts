import { LikesInfo } from '../../../common/types/reactions';

import { Comment } from '../schemas';
import { ViewComment } from '../models/view-comment';

export const commentMapper = (
  commentDB: Comment & { currentUserId: string | undefined; commentatorLogin: string },
): ViewComment => {
  const { id, content, userId, createdAt, reactions, commentatorLogin } = commentDB;

  const likesCount = reactions.filter((reaction) => reaction.status === 'Like').length;
  const likesInfo: LikesInfo = {
    likesCount,
    dislikesCount: reactions.length - likesCount,
    myStatus: /* reactions.find((reaction) => reaction.userId === currentUserId)?.status || */ 'None',
  };

  return { id, content, userId, userLogin: commentatorLogin, createdAt, likesInfo };
};
