export interface LikeButtonPropsType {
  likeCount: number;
  isLiked: boolean;
  contentId: number;
  userId: string;
  likeCountMutate: any;
  isLikedMutate: any;
}

export interface ModifyButtonPropsType {
  board: string;
  contentId: number;
  author: string;
}
export interface DeleteButtonPropsType {
  board: string;
  contentId: number;
  author: string;
}
