import styles from "@src/styles/board/content/Comment.module.scss";
import {
  CommentURLByContent,
  CommentFetcher,
} from "@src/components/fetcher/CommentFetcher";
import { saveCommentByContentId } from "@src/components/func/sendRequest";
import { useSession, signOut } from "next-auth/react";
import { useMemo, useRef } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import CommentBar from "./CommentBar";

const Comment = ({ contentId }: { contentId: number }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const $textarea = useRef<HTMLTextAreaElement>(null);
  const { data, mutate } = useSWR(
    CommentURLByContent(contentId),
    CommentFetcher
  );

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
  const uploadComment = () => {
    saveCommentByContentId(
      $textarea.current.value,
      contentId,
      session?.user?.id
    ).then((_res) => {
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
      <div className={`${styles.comment_list}`}>{CommentList}</div>
    </div>
  );
};

export default Comment;
