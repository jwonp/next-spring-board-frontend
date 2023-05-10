import styles from "@src/styles/board/content/Comment.module.scss";
import {
  CommentURLByContent,
  CommentFetcher,
} from "@src/components/fetcher/CommentFetcher";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef } from "react";
import useSWR from "swr";
import CommentBar from "./CommentBar";
import { uploadComment } from "@src/components/func/CommentFuncs";

const Comment = ({ contentId }: { contentId: number }) => {
  const { data: session } = useSession();
  const $textarea = useRef<HTMLTextAreaElement>(null);
  const { data, mutate } = useSWR(
    CommentURLByContent(contentId),
    CommentFetcher
  );

  useEffect(() => {
    mutate();
  }, []);

  const CommentList = useMemo(() => {
    return data?.map((value, index) => (
      <CommentBar
        key={index}
        comment={value}
        userId={session?.user?.id}
        mutate={mutate}
      />
    ));
  }, [data]);

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
          onClick={() =>
            uploadComment($textarea, contentId, session.user.id, mutate)
          }>
          등록
        </button>
      </div>
      <div className={`${styles.comment_list}`}>{CommentList}</div>
    </div>
  );
};

export default Comment;
