import { modifyComment } from "@src/components/func/RequestFuncs";
import {
  getModifyIndex,
  resetModifyIndex,
  setModifyIndex,
} from "@src/redux/features/commentModify";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import {
  ModifyCommentRequest,
  CommentModifyData,
} from "@src/static/types/CommentType";

import styles from "@src/styles/board/content/button/CommentModifyButton.module.scss";
const CommentModifyButton = ({
  commentId,
  writer,
  $textarea,
  mutate,
}: CommentModifyData) => {
  const dispatch = useAppDispatch();

  const modifyIndex = useAppSelector(getModifyIndex);
  return (
    <div className={`${styles.modify_button}`}>
      {modifyIndex > 0 && modifyIndex === commentId ? (
        <>
          <div
            onClick={() => {
              const ModifiedData: ModifyCommentRequest = {
                commentId: commentId,
                comment: $textarea.current.value,
                writer: writer,
              };
              modifyComment(ModifiedData).then(() => {
                mutate();
                dispatch(resetModifyIndex());
              });
            }}>
            확인
          </div>
          <div
            onClick={() => {
              dispatch(resetModifyIndex());
            }}>
            취소
          </div>
        </>
      ) : (
        <div
          onClick={() => {
            dispatch(setModifyIndex(commentId));
          }}>
          수정
        </div>
      )}
    </div>
  );
};

export default CommentModifyButton;
