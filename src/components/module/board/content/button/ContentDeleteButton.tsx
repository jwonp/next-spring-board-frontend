import styles from "@src/styles/board/content/button/ContentDeleteButton.module.scss";
import { DeleteButtonProps } from "@src/static/types/ButtonPropsType";
import useSWR from "swr";
import {
  isAuthorURLByContentId,
  isAuthorByContentIdFetcher,
} from "@src/components/fetcher/IsAuthorFetcher";
import { useRouter } from "next/router";
import { deleteContent } from "@src/components/func/RequestFuncs";
import { useSession } from "next-auth/react";
import Empty from "@src/components/module/Empty";
const ContentDeleteButton = ({
  board,
  contentId,
  author,
}: DeleteButtonProps) => {
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
    return <Empty />;
  }
};

export default ContentDeleteButton;
