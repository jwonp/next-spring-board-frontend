import { KeyedMutator } from "swr";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
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
  writerId: string;
  created: string;
  updated: string;
}
export interface CommentBarType {
  key: number;
  comment: CommentType;
  userId: string;
  mutate: KeyedMutator<CommentType[]>;
}
export interface ModifyCommentRequestType {
  commentId: number;
  comment: string;
  writer: string;
}
export interface ModifyCommentType {
  commentId: number;
  writer: string;
  $textarea: MutableRefObject<HTMLTextAreaElement>;
  mutate: KeyedMutator<CommentType[]>;
}
export interface DeleteCommentType {
  commentId: number;
  userId: string;
  mutate: KeyedMutator<CommentType[]>;
}
