import { deleteComment } from "@src/components/func/sendRequest";
import { DeleteCommentType } from "@src/static/types/CommentType";
import styles from "@src/styles/board/content/button/CommentDeleteButton.module.scss";
const CommentDeleteButton = ({
  commentId,
  userId,
  mutate,
}: DeleteCommentType) => {
  return (
    <div
      className={`${styles.delete_btn}`}
      onClick={() => {
        deleteComment(commentId, userId).then(() => {
          mutate();
        });
      }}>
      삭제
    </div>
  );
};

export default CommentDeleteButton;
