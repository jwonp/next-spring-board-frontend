import {
  PageSizeFetcher,
  PageSizeURLByBoardAndSearch,
} from "@src/components/fetcher/PageSizeFetcher";
import { setIndex } from "@src/redux/features/pageIndex";
import { useAppDispatch } from "@src/redux/hooks";

import { OneToTen } from "@src/static/data/stringSet";
import styles from "@src/styles/board/PaginationBar.module.scss";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";
const PaginationBar = ({
  boardTitle,
  search,
}: {
  boardTitle: string;
  search: string | undefined;
}) => {
  const { cache, mutate, ...extraConfig } = useSWRConfig();
  const dispatch = useAppDispatch();
  const pageSize = useSWR(
    PageSizeURLByBoardAndSearch(boardTitle, search),
    PageSizeFetcher
  );
  const NavigatorNumberPanel = useMemo(() => {
    if (pageSize.isLoading) return;

    const maxSize = pageSize?.data
      ? pageSize?.data
      : cache.get(PageSizeURLByBoardAndSearch(boardTitle, search))?.data;

    return OneToTen.map((val, idx) => {
      if (idx < Math.ceil(maxSize / 10)) {
        return (
          <div
            key={idx}
            className={`${styles.item}  ${styles.number_panel}`}
            onClick={() => {
              console.log(idx);
              dispatch(setIndex(idx));
            }}>
            {val}
          </div>
        );
      }
    });
  }, [boardTitle, search, pageSize.isLoading]);

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
