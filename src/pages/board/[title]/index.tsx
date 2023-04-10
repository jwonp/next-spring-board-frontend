import { boardListFetcher } from "@src/components/fetcher/BoardListFetcher";
import ContentBar from "@src/components/module/board/ContentBar";
import PaginationBar from "@src/components/module/board/PaginationBar";

import { contentType } from "@src/static/types/contentType";
import styles from "@src/styles/board/BoardByTitle.module.scss";
import Image from "next/image";
import Link from "next/link";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { sizes } from "@src/static/data/stringSet";
const BoardByTitle = () => {
  const router = useRouter();
  const $searchInput = useRef<HTMLInputElement>(null);
  const searchCall = useRef(
    debounce(async () => {
      if ($searchInput.current.value.length === 0) return;
      await axios
        .get(`/api/board/search/${$searchInput.current.value}`)
        .then((res) => {
          console.log(res.data);
        });
    }, 700)
  ).current;
  const [pageIndex] = useState<number>(0);

  const title = useMemo(() => {
    return router.query.title as string;
  }, [router.query.title]);
  const contentData = useSWR(
    `/api/board/list?page=${pageIndex}&title=${title}`,
    boardListFetcher
  );

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.header}`}>
        <div className={`${styles.title}`}>{title}</div>

        <div className={`${styles.search}`}>
          <div className={`${styles.search_icon}`}>
            <Image src={"/search.svg"} alt={""} fill sizes={sizes} />
          </div>
          <input
            ref={$searchInput}
            type={"text"}
            onChange={searchCall}
            // value={searchStr}
          />
        </div>
        <div>
          <Link href={`/board/${title}/content`}>write</Link>
        </div>
      </div>
      <div className={`${styles.list}`}>
        {contentData.data?.map((item: contentType) => (
          <ContentBar key={item.index} data={item} title={title} />
        ))}
      </div>
      <PaginationBar boardTitle={title} />
    </div>
  );
};

export default BoardByTitle;
