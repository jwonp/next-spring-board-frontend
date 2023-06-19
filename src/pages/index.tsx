import {
  MostViewURL,
  MostViewFetcher,
  RecentlyFetcher,
  MostLikeFetcher,
  MostLikeURL,
  RecentlyURL,
} from "@src/components/fetcher/IndexPageFetecher";

import ContentList from "@src/components/module/board/ContentList";
import { titlesOnIndexPage } from "@src/static/strings/stringSet";
import styles from "@src/styles/index.module.scss";
import { Inter } from "next/font/google";
import { useMemo } from "react";
import useSWR from "swr";
const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const MostViewSWR = useSWR(MostViewURL(), MostViewFetcher);
  const MostLikeSWR = useSWR(MostLikeURL(), MostLikeFetcher);
  const RecentlySWR = useSWR(RecentlyURL(), RecentlyFetcher);

  const MostViewList = useMemo(() => {
    return <ContentList contentList={MostViewSWR?.data} />;
  }, [MostViewSWR]);

  const MostLikeList = useMemo(() => {
    return <ContentList contentList={MostLikeSWR?.data} />;
  }, [MostLikeSWR]);

  const RecentlyList = useMemo(() => {
    return <ContentList contentList={RecentlySWR?.data} />;
  }, [RecentlySWR]);

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.box}`}>
        <div className={`${styles.title}`}>{titlesOnIndexPage.MostViewed}</div>
        <div className={`${styles.list}`}>{MostViewList}</div>
      </div>
      <div className={`${styles.box}`}>
        <div className={`${styles.title}`}>{titlesOnIndexPage.MostLiked}</div>
        <div className={`${styles.list}`}>{MostLikeList}</div>
      </div>
      <div className={`${styles.box}`}>
        <div className={`${styles.title}`}>{titlesOnIndexPage.Recently}</div>
        <div className={`${styles.list}`}>{RecentlyList}</div>
      </div>
    </div>
  );
};

export default Home;
