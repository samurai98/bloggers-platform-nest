// for schema
export const reaction = {
  userId: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: String, required: true },
};

const likeStatuses = ['None', 'Like', 'Dislike'] as const;

type LikeStatus = typeof likeStatuses[number];

export type LikesInfo = { likesCount: number; dislikesCount: number; myStatus: LikeStatus };

type NewestLike = { addedAt: string; userId: string; login: string };

export type ExtendedLikesInfo = LikesInfo & { newestLikes: NewestLike[] };
