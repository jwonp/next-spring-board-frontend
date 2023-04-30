import styles from "@src/styles/board/content/ContentById.module.scss";
import { getContentById } from "@src/components/func/sendRequest";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { ContentViewType } from "@src/static/types/ContentViewType";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import qs from "qs";
import { useEffect, useMemo, useRef } from "react";
import { getDateFromRowDateAsString } from "@src/components/func/DateParser";
import ContentViewBar from "@src/components/module/board/content/ContentViewBar";
import useSWR from "swr";
import Comment from "@src/components/module/board/content/Comment";
import { useRouter } from "next/router";

import {
  LikeFetcherURLByContentId,
  LikeFetcher,
  LikedFetcher,
  isLikedURLByContentIdAndUserId,
} from "@src/components/fetcher/LikeFetcher";
import { useSession } from "next-auth/react";
import LikeButton from "@src/components/module/board/content/button/LikeButton";
import ContentModifyButton from "@src/components/module/board/content/button/ContentModifyButton";
import ContentDeleteButton from "@src/components/module/board/content/button/ContentDeleteButton";
import { ParsedContentType } from "@src/static/types/ParsedContentType";

const ContentById = ({
  views,
  title,
  board,
  author,
  updated,
  likes,
  id,
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = useMemo(() => {
    return session?.user?.id;
  }, [session]);
  const likeSWR = useSWR(LikeFetcherURLByContentId(id), LikeFetcher);
  const likedSWR = useSWR(
    isLikedURLByContentIdAndUserId(id, userId),
    LikedFetcher
  );

  const parsedContent = useMemo(() => {
    const parsedData = qs.parse(content, {
      parseArrays: true,
    }) as unknown as ParsedContentType;
    return Object.values(parsedData) as ContentBarDataType[];
  }, [content]);
  const $windowWidth = useRef<number>(0);

  useEffect(() => {
    if (router.isReady) {
      getWindowWidth();
      window.addEventListener("resize", getWindowWidth);
    }
  }, [router.isReady]);

  const getWindowWidth = () => {
    try {
      if (!document) return;
      const mainWrapper = document.getElementById("ContentById");
      const paddingWidth =
        Number(
          window
            .getComputedStyle(mainWrapper, null)
            .getPropertyValue("padding")
            .split("px")[0]
        ) * 2;

      const width = mainWrapper.offsetWidth - paddingWidth;
      $windowWidth.current = width;
    } catch {
      return;
    }
  };

  return (
    <div id={"ContentById"} className={`${styles.wrapper}`}>
      <div className={`${styles.header_box}`}>
        <div className={`${styles.meta_box}`}>
          <div>
            <div className={`${styles.board}`}>{board}</div>
            <div className={`${styles.title}`}>{title}</div>
          </div>
          <div>
            <div className={`${styles.author}`}>{`작성자 ${author}`}</div>
            <div className={`${styles.updated}`}>
              {`작성일 ${getDateFromRowDateAsString(updated)}`}
            </div>
            <div className={`${styles.views}`}>{`조회수 ${views}`}</div>
            <div className={`${styles.likes}`}>{`좋아요 ${
              likeSWR.data ? likeSWR.data : likes
            }`}</div>
          </div>
        </div>
        <div className={`${styles.control_btn_box}`}>
          <ContentModifyButton board={board} contentId={id} author={userId} />
          <ContentDeleteButton board={board} contentId={id} author={userId} />
        </div>
      </div>
      <div className={`${styles.content_box}`}>
        {parsedContent.map((value, index) => {
          return (
            <div key={index} className={`${styles.item}`}>
              <ContentViewBar data={value} windowWidth={$windowWidth} />
            </div>
          );
        })}
      </div>
      <LikeButton
        likeCount={likeSWR.data}
        isLiked={likedSWR.data}
        contentId={id}
        userId={userId}
        likeCountMutate={likeSWR.mutate}
        isLikedMutate={likedSWR.mutate}
      />
      <Comment id={id} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ContentViewType> = async (
  context
) => {
  const { id } = context.query;

  const returnData = (await getContentById(id as string)).data;

  return {
    props: { ...returnData },
  };
};
export default ContentById;
