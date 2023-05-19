export interface LikeButtonProps {
  likeCount: number;
  isLiked: boolean;
  contentId: number;
  userId: string;
  likeCountMutate: any;
  isLikedMutate: any;
}

export interface ModifyButtonProps {
  board: string;
  contentId: number;
  author: string;
}
export interface DeleteButtonProps {
  board: string;
  contentId: number;
  author: string;
}
