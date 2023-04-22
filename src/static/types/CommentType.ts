export interface CommentRequestType {
  comment: string;
  contentId: number;
  user: string;
}

export interface CommentType {
  commentId: number;
  contentId: number;
  comment: string;
  writer: string;
  created: string;
  updated: string;
}
