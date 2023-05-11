import {
  MostViewURL,
  MostViewFetcher,
  RecentlyFetcher,
  MostLikeFetcher,
  MostLikeURL,
  RecentlyURL,
} from "@src/components/fetcher/IndexPageFetecher";

import ContentViewList from "@src/components/module/board/content/edit/ContentViewList";
import styles from "@src/styles/index.module.scss";
import { Inter } from "next/font/google";
import { useMemo } from "react";
import useSWR from "swr";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const MostViewSWR = useSWR(MostViewURL(), MostViewFetcher);
  const MostLikeSWR = useSWR(MostLikeURL(), MostLikeFetcher);
  const RecentlySWR = useSWR(RecentlyURL(), RecentlyFetcher);

  const MostViewList = useMemo(() => {
    return <ContentViewList contentList={MostLikeSWR?.data} />;
  }, [MostViewSWR]);

  const MostLikeList = useMemo(() => {
    return <ContentViewList contentList={MostLikeSWR?.data} />;
  }, [MostLikeSWR]);

  const RecentlyList = useMemo(() => {
    return <ContentViewList contentList={RecentlySWR?.data} />;
  }, [RecentlySWR]);

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.box}`}>
        <div className={`${styles.title}`}>most viewed</div>
        <div className={`${styles.list}`}>{MostViewList}</div>
      </div>
      <div className={`${styles.box}`}>
        <div className={`${styles.title}`}>most liked</div>
        <div className={`${styles.list}`}>{MostLikeList}</div>
      </div>
      <div className={`${styles.box}`}>
        <div className={`${styles.title}`}>recently</div>
        <div className={`${styles.list}`}>{RecentlyList}</div>
      </div>
    </div>
  );
}
