import {
  addLikeByContentAndUser,
  deleteLikeByContentAndUser,
} from "@src/components/func/sendRequest";
import { LikeButtonPropsType } from "@src/static/types/ButtonPropsType";
import styles from "@src/styles/board/content/button/LikeButton.module.scss";
import Image from "next/image";
const LikeButton = ({
  likeCount,
  isLiked,
  contentId,
  userId,
  likeCountMutate,
  isLikedMutate,
}: LikeButtonPropsType) => {
  return (
    <div className={`${styles.like}`}>
      <div>
        <button
          onClick={() => {
            console.log(isLiked);
            if (isLiked === false) {
              addLikeByContentAndUser(contentId, userId).then((res) => {
                likeCountMutate();
                isLikedMutate();
              });
            }
            if (isLiked === true) {
              deleteLikeByContentAndUser(contentId, userId).then((res) => {
                likeCountMutate();
                isLikedMutate();
              });
            }
          }}>
          <div>
            <Image src={"/like.svg"} alt={"No like"} width={30} height={30} />
            <div>{likeCount ? likeCount : 0}</div>
            <div>{isLiked ? "cancel" : "like"}</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LikeButton;
