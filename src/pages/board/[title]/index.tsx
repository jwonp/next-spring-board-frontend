import styles from "@src/styles/board/BoardByTitle.module.scss";
import {
  boardListFetcher,
  boardListURLByBoardAndIndex,
} from "@src/components/fetcher/BoardListFetcher";
import PaginationBar from "@src/components/module/board/PaginationBar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import useSWR from "swr";
import {
  WRITE,
  inputType,
  SIZES,
  EMPTY_STRING,
  NO_CONTENT,
} from "@src/static/strings/stringSet";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { getIndex, setIndex } from "@src/redux/features/pageIndex";
import ContentList from "@src/components/module/board/ContentList";
import { SEARCH_SVG } from "@src/static/strings/IconSrc";

const BoardByTitle = () => {
  const router = useRouter();
  const $searchInput = useRef<HTMLInputElement>(null);

  const boardTitle = useMemo(() => {
    return router.query.title as string;
  }, [router.query.title]);

  const searchQuery = useMemo(() => {
    return router.query.search as string;
  }, [router.query.search]);

  const dispatch = useAppDispatch();
  const pageIndex = useAppSelector(getIndex);

  const contentData = useSWR(
    boardListURLByBoardAndIndex(boardTitle, pageIndex, searchQuery),
    boardListFetcher
  );

  const ContentBarList = useMemo(() => {
    if (contentData.data?.length === 0) {
      return <div className={`${styles.no_content}`}>{NO_CONTENT}</div>;
    }

    return (
      <ContentList
        contentList={contentData?.data}
        boardTitle={boardTitle}
      />
    );
  }, [contentData]);

  useEffect(() => {
    contentData.mutate();
    $searchInput.current.value = EMPTY_STRING;
    dispatch(setIndex(0));
  }, [boardTitle]);

  const runSearch = () => {
    router.push(`/board/${boardTitle}?search=${$searchInput.current.value}`);
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.title}`}>{boardTitle}</div>

        <div className={`${styles.search}`}>
          <div className={`${styles.search_input_box}`}>
            <div className={`${styles.search_input}`}>
              <input
                ref={$searchInput}
                type={inputType.text}
              />
            </div>
            <button
              className={`${styles.search_icon}`}
              onClick={runSearch}>
              <Image
                src={SEARCH_SVG.src}
                alt={SEARCH_SVG.alt}
                fill
                sizes={SIZES}
              />
            </button>
          </div>
        </div>
        <div className={`${styles.edit_btn}`}>
          <Link href={`/board/${boardTitle}/content/edit`}>{WRITE}</Link>
        </div>
      </div>
      <div className={`${styles.list}`}>{ContentBarList}</div>
      <PaginationBar
        boardTitle={boardTitle}
        search={searchQuery}
      />
    </div>
  );
};

export default BoardByTitle;
