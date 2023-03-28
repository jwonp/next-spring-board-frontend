import { PageSizeFetcher } from "@src/components/fetcher/PageSizeFetcher";
import { APIBoardSizeURI } from "@src/static/data/requestURI";
import { OneToTen } from "@src/static/data/stringSet";
import styles from "@src/styles/board/PaginationBar.module.scss";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";
const PaginationBar = ({ boardTitle }: { boardTitle: string }) => {
  const router = useRouter();
  const { cache, mutate, ...extraConfig } = useSWRConfig();

  const pageSize = useSWR(APIBoardSizeURI(boardTitle), PageSizeFetcher);
  const NavigatorNumberPanel = useMemo(() => {
    if (pageSize.isLoading) return;
    const maxSize = pageSize?.data
      ? pageSize?.data
      : cache.get(APIBoardSizeURI(boardTitle))?.data;

    return OneToTen.map((val, idx) => {
      if (idx < maxSize) {
        return (
          <div key={idx} className={`${styles.item}  ${styles.number_panel}`}>
            {val}
          </div>
        );
      }
    });
  }, [boardTitle, pageSize.isLoading]);

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.item} ${styles.indicator}`}>{"<<"}</div>
        <div className={`${styles.item}  ${styles.indicator}`}>{"<"}</div>
        <div className={`${styles.number_panel_box}`}>
          {NavigatorNumberPanel}
        </div>
        <div className={`${styles.item}  ${styles.indicator}`}>{">"}</div>
        <div className={`${styles.item}  ${styles.indicator}`}>{">>"}</div>
      </div>
    </div>
  );
};

export default PaginationBar;
