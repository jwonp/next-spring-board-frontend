import styles from "@src/styles/board/content/Comment.module.scss";
import {
  CommentURLByContent,
  CommentFetcher,
} from "@src/components/fetcher/CommentFetcher";
import { saveCommentByContentId } from "@src/components/func/sendRequest";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useMemo, useRef } from "react";
import useSWR from "swr";
import { getDateFromRowDateAsString } from "@src/components/func/DateParser";
import { useRouter } from "next/router";
const Comment = ({ id }: { id: number }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const $textarea = useRef<HTMLTextAreaElement>(null);
  const { data, mutate } = useSWR(CommentURLByContent(id), CommentFetcher);
  const user = useMemo(() => {
    return session?.user?.id;
  }, [session]);

  const uploadComment = () => {
    saveCommentByContentId($textarea.current.value, id, user).then((_res) => {
      if (_res.data === false) {
        signOut();
        router.push("/");
        return;
      }

      $textarea.current.value = "";
      mutate();
    });
  };
  return (
    <div className={`${styles.wrapper}`}>
      <div>댓글 {data?.length}</div>
      <div className={`${styles.input_form}`}>
        <div>
          <textarea
            ref={$textarea}
            placeholder={"댓글을 입력하세요."}
            maxLength={500}
            required={true}></textarea>
        </div>

        <button onClick={uploadComment}>등록</button>
      </div>
      <div className={`${styles.comment_list}`}>
        {data?.map((value, index) => {
          return (
            <div key={index} className={`${styles.comment}`}>
              <div>{value.comment}</div>
              <div>
                <div>{value.writer}</div>
                <div>{getDateFromRowDateAsString(value.updated)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
