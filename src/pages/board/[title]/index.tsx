import styles from "@src/styles/board/BoardByTitle.module.scss";
import { boardListFetcher } from "@src/components/fetcher/BoardListFetcher";
import ContentBar from "@src/components/module/board/ContentBar";
import PaginationBar from "@src/components/module/board/PaginationBar";
import { ContentType } from "@src/static/types/ContentType";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import useSWR from "swr";
import { sizes } from "@src/static/data/stringSet";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { getIndex, setIndex } from "@src/redux/features/pageIndex";

const BoardByTitle = () => {
  const router = useRouter();
  const $searchInput = useRef<HTMLInputElement>(null);

  const title = useMemo(() => {
    return router.query.title as string;
  }, [router.query.title]);

  const searchQuery = useMemo(() => {
    return router.query.search as string;
  }, [router.query.search]);

  const dispatch = useAppDispatch();
  const pageIndex = useAppSelector(getIndex);

  const contentData = useSWR(
    searchQuery
      ? `/api/board/search?board=${title}&query=${searchQuery}`
      : `/api/board/list?index=${pageIndex}&board=${title}`,
    boardListFetcher
  );

  const ContentBarList = useMemo(() => {
    if (contentData.data?.length === 0) {
      return <div className={`${styles.no_content}`}>No Content</div>;
    }
    return contentData.data?.map((item: ContentType, index) => (
      <div key={index}>
        <ContentBar data={item} title={title} />
      </div>
    ));
  }, [contentData]);

  useEffect(() => {
    $searchInput.current.value = "";
    dispatch(setIndex(0));
  }, [title]);

  const runSearch = () => {
    router.push(`/board/${title}?search=${$searchInput.current.value}`);
  };
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.title}`}>{title}</div>

        <div className={`${styles.search}`}>
          <div className={`${styles.search_input_box}`}>
            <input ref={$searchInput} type={"text"} />
          </div>
          <button className={`${styles.search_icon}`} onClick={runSearch}>
            <Image src={"/search.svg"} alt={""} fill sizes={sizes} />
          </button>
        </div>
        <div className={`${styles.edit_btn}`}>
          <Link href={`/board/${title}/content/edit`}>write</Link>
        </div>
      </div>
      <div className={`${styles.list}`}>{ContentBarList}</div>
      <PaginationBar boardTitle={title} search={searchQuery} />
    </div>
  );
};

export default BoardByTitle;
