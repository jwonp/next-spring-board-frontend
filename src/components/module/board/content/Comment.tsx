import styles from "@src/styles/board/content/Comment.module.scss";
import {
  CommentURLByContent,
  CommentFetcher,
} from "@src/components/fetcher/CommentFetcher";
import { saveCommentByContentId } from "@src/components/func/sendRequest";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import useSWR from "swr";
import { getDateFromRowDateAsString } from "@src/components/func/DateParser";
const Comment = ({ id }: { id: number }) => {
  const { data: session } = useSession();
  const $textarea = useRef<HTMLTextAreaElement>(null);
  const { data, mutate } = useSWR(CommentURLByContent(id), CommentFetcher);

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

        <button
          onClick={() => {
            saveCommentByContentId(
              $textarea.current.value,
              id,
              session.user.id
            ).then(() => {
              $textarea.current.value = "";
              mutate();
            });
          }}>
          등록
        </button>
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
