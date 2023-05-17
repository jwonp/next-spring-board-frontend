import { signOut } from "next-auth/react";
import router from "next/router";
import { KeyedMutator } from "swr";
import { saveCommentByContentId } from "./RequestFuncs";
import { CommentType } from "@src/static/types/CommentType";
import { MutableRefObject } from "react";

export const uploadComment = (
  $textarea: MutableRefObject<HTMLTextAreaElement>,
  contentId: number,
  userId: string,
  mutate: KeyedMutator<CommentType[]>
) => {
  saveCommentByContentId($textarea.current.value, contentId, userId).then(
    (_res) => {
      if (_res.data === false) {
        signOut();
        router.push("/");
        return;
      }
      $textarea.current.value = "";
      mutate();
    }
  );
};
