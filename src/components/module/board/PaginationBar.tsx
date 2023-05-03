import {
  PageSizeFetcher,
  PageSizeURLByBoardAndSearch,
} from "@src/components/fetcher/PageSizeFetcher";
import { getPaginationIndex } from "@src/components/func/ContentViewFuncs";
import {
  getIndex,
  minusOne,
  minusTen,
  plusOne,
  plusTen,
  setIndex,
} from "@src/redux/features/pageIndex";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";

import { OneToTen } from "@src/static/data/stringSet";
import styles from "@src/styles/board/PaginationBar.module.scss";

import { useMemo } from "react";
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
  const pageIndex = useAppSelector(getIndex);
  const pageSize = useSWR(
    PageSizeURLByBoardAndSearch(boardTitle, search),
    PageSizeFetcher
  );
  const maxIndex = useMemo(() => {
    if (pageSize.isLoading) return;

    const maxSize = pageSize?.data
      ? pageSize?.data
      : cache.get(PageSizeURLByBoardAndSearch(boardTitle, search))?.data;

    return Math.ceil(maxSize / 10);
  }, [pageSize]);

  const NavigatorNumberPanel = useMemo(() => {
    return OneToTen.map((val, idx) => {
      if (idx < maxIndex) {
        return (
          <div
            key={idx}
            className={`${styles.item}  ${styles.number_panel}`}
            onClick={() => {
              dispatch(setIndex(idx));
            }}>
            {getPaginationIndex(pageIndex, val)}
          </div>
        );
      }
    });
  }, [boardTitle, search, pageSize.isLoading]);

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.container}`}>
        <div
          className={`${styles.item} ${styles.indicator}`}
          onClick={() => {
            dispatch(minusTen());
          }}>
          {"<<"}
        </div>
        <div
          className={`${styles.item}  ${styles.indicator}`}
          onClick={() => {
            dispatch(minusOne());
          }}>
          {"<"}
        </div>
        <div className={`${styles.number_panel_box}`}>
          {NavigatorNumberPanel}
        </div>
        <div
          className={`${styles.item}  ${styles.indicator}`}
          onClick={() => {
            dispatch(plusOne(maxIndex));
          }}>
          {">"}
        </div>
        <div
          className={`${styles.item}  ${styles.indicator}`}
          onClick={() => {
            dispatch(plusTen(maxIndex));
          }}>
          {">>"}
        </div>
      </div>
    </div>
  );
};

export default PaginationBar;
