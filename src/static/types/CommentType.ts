import { KeyedMutator } from "swr";
import { MutableRefObject } from "react";
export interface CommentRequest {
  comment: string;
  contentId: number;
  user: string;
}

export interface CommentData {
  commentId: number;
  contentId: number;
  comment: string;
  writer: string;
  writerId: string;
  created: string;
  updated: string;
}
export interface CommentBarData {
  key: number;
  comment: CommentData;
  userId: string;
  mutate: KeyedMutator<CommentData[]>;
}
export interface ModifyCommentRequest {
  commentId: number;
  comment: string;
  writer: string;
}
export interface CommentModifyData {
  commentId: number;
  writer: string;
  $textarea: MutableRefObject<HTMLTextAreaElement>;
  mutate: KeyedMutator<CommentData[]>;
}
export interface CommentDeleteData {
  commentId: number;
  userId: string;
  mutate: KeyedMutator<CommentData[]>;
}
