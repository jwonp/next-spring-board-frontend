import styles from "@src/styles/board/content/button/ContentDeleteButton.module.scss";
import { DeleteButtonPropsType } from "@src/static/types/ButtonPropsType";
import useSWR from "swr";
import {
  isAuthorURLByContentId,
  isAuthorByContentIdFetcher,
} from "@src/components/fetcher/IsAuthorFetcher";
import { useRouter } from "next/router";
import { deleteContent } from "@src/components/func/requestFuncs";
import { useSession } from "next-auth/react";
const ContentDeleteButton = ({
  board,
  contentId,
  author,
}: DeleteButtonPropsType) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, mutate } = useSWR(
    isAuthorURLByContentId(contentId, author),
    isAuthorByContentIdFetcher
  );
  if (data) {
    return (
      <div className={`${styles.delete_btn}`}>
        <button
          onClick={() => {
            deleteContent(contentId, session.user.id);
            router.push(`/board/${board}`);
          }}>
          <div>삭제</div>
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ContentDeleteButton;
