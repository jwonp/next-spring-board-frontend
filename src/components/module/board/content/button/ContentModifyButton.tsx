import styles from "@src/styles/board/content/button/ContentModifyButton.module.scss";
import { ModifyButtonProps } from "@src/static/types/ButtonPropsType";
import useSWR from "swr";
import {
  isAuthorURLByContentId,
  isAuthorByContentIdFetcher,
} from "@src/components/fetcher/IsAuthorFetcher";
import { useRouter } from "next/router";
import Empty from "@src/components/module/Empty";
const ContentModifyButton = ({
  board,
  contentId,
  author,
}: ModifyButtonProps) => {
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
    <Empty />;
  }
};

export default ContentModifyButton;
