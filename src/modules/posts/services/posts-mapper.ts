import { LikesInfo } from '../../../common/types/reactions';

import { Post } from '../schemas';
import { ViewPost } from '../models/view-post';

export const postMapper = (postDB: Post): ViewPost => {
  const { id, title, shortDescription, content, blogId, blogName, createdAt, reactions } = postDB;

  const likesCount = reactions.filter((reaction) => reaction.status === 'Like').length;
  const likesInfo: LikesInfo = {
    likesCount,
    dislikesCount: reactions.length - likesCount,
    myStatus: /* reactions.find((reaction) => reaction.userId === currentUserId)?.status || */ 'None',
  };

  return {
    id,
    title,
    shortDescription,
    content,
    blogId,
    blogName,
    createdAt,
    extendedLikesInfo: { ...likesInfo, newestLikes: [] },
  };
};
