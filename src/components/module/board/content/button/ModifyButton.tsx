import styles from "@src/styles/board/content/button/ModifyButton.module.scss";
import { ModifyButtonPropsType } from "@src/static/types/ButtonPropsType";
import useSWR from "swr";
import {
  isAuthorURLByContentId,
  isAuthorByContentIdFetcher,
} from "@src/components/fetcher/IsAuthorFetcher";
import { useRouter } from "next/router";
const ModifyButton = ({ board, contentId, author }: ModifyButtonPropsType) => {
  const router = useRouter();
  const { data, mutate } = useSWR(
    isAuthorURLByContentId(contentId, author),
    isAuthorByContentIdFetcher
  );

  if (data) {
    return (
      <div className={`${styles.modify_btn}`}>
        <button
          onClick={() => {
            router.push(`/board/${board}/content/modify/${contentId}`);
          }}>
          <div>수정</div>
        </button>
      </div>
    );
  } else {
    <></>;
  }
};

export default ModifyButton;
