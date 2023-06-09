import { CommentBarData } from "@src/static/types/CommentType";
import styles from "@src/styles/board/content/CommentBar.module.scss";
import CommentModifyButton from "./button/CommentModifyButton";
import CommentDeleteButton from "./button/CommentDeleteButton";
import { getDateAsShortString } from "@src/components/func/DateParser";
import { useRef } from "react";
import { useAppSelector } from "@src/redux/hooks";
import { getModifyIndex } from "@src/redux/features/commentModify";
import { DateTime } from "luxon";
import Empty from "../../Empty";

const CommentBar = ({ comment, userId, mutate }: CommentBarData) => {
  const $textarea = useRef<HTMLTextAreaElement>(null);
  const modifyIndex = useAppSelector(getModifyIndex);

  return (
    <div className={`${styles.comment}`}>
      <div>
        {modifyIndex > 0 && modifyIndex === comment.commentId ? (
          <textarea
            className={`${styles.content_modify}`}
            ref={$textarea}
            defaultValue={comment.comment}
          />
        ) : (
          <div className={`${styles.content}`}>{comment.comment}</div>
        )}

        <div className={`${styles.meta}`}>
          <div>{comment.writer}</div>
          <div>{getDateAsShortString(comment.updated, DateTime.now())}</div>
        </div>
      </div>
      <div className={`${styles.handler_box}`}>
        {userId && comment.writerId === userId ? (
          <div className={`${styles.control}`}>
            <CommentModifyButton
              commentId={comment.commentId}
              writer={userId}
              mutate={mutate}
              $textarea={$textarea}
            />
            <CommentDeleteButton
              commentId={comment.commentId}
              userId={userId}
              mutate={mutate}
            />
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default CommentBar;
