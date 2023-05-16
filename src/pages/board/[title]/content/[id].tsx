import styles from "@src/styles/board/content/ContentById.module.scss";
import { getContentById } from "@src/components/func/requestFuncs";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { ContentViewType } from "@src/static/types/ContentViewType";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import qs from "qs";
import { useEffect, useMemo } from "react";
import { getDateAsString } from "@src/components/func/DateParser";
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
import { useAppDispatch } from "@src/redux/hooks";
import { setWidth } from "@src/redux/features/windowWidth";
import { getWindowWidth } from "@src/components/func/ContentViewFuncs";
import { CONTENT_BY_ID_ID } from "@src/static/strings/HttpElementId";
import { contentMetaColumns } from "@src/static/strings/stringSet";
import Empty from "@src/components/module/Empty";

const ContentById = ({
  views,
  title,
  board,
  author,
  authorId,
  updated,
  likes,
  contentId,
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const userId = useMemo(() => {
    return session?.user?.id;
  }, [session]);
  const likeSWR = useSWR(LikeFetcherURLByContentId(contentId), LikeFetcher);
  const likedSWR = useSWR(
    isLikedURLByContentIdAndUserId(contentId, userId),
    LikedFetcher
  );

  const parsedContent = useMemo(() => {
    const parsedData = qs.parse(content, {
      parseArrays: true,
    }) as unknown as ParsedContentType;
    return Object.values(parsedData) as ContentBarDataType[];
  }, [content]);

  useEffect(() => {
    if (router.isReady) {
      if (!document) return;
      const mainWrapper = document.getElementById(CONTENT_BY_ID_ID);
      dispatch(setWidth(getWindowWidth(mainWrapper)));
      window.addEventListener("resize", () => {
        dispatch(setWidth(getWindowWidth(mainWrapper)));
      });
    }
  }, [router.isReady]);

  return (
    <div
      id={CONTENT_BY_ID_ID}
      className={`${styles.wrapper}`}>
      <div className={`${styles.header_box}`}>
        <div className={`${styles.meta_box}`}>
          <div>
            <div className={`${styles.board}`}>{board}</div>
            <div className={`${styles.title}`}>{title}</div>
          </div>
          <div>
            <div className={`${styles.author}`}>
              <div>{contentMetaColumns.author}</div>
              <div>{author}</div>
            </div>
            <div className={`${styles.updated}`}>
              <div>{contentMetaColumns.created}</div>
              <div>{getDateAsString(updated)}</div>
            </div>
            <div className={`${styles.views}`}>
              <div>{contentMetaColumns.views}</div>
              <div>{views}</div>
            </div>
            <div className={`${styles.likes}`}>
              <div>{contentMetaColumns.likes}</div>
              <div>{likeSWR.data ? likeSWR.data : likes}</div>
            </div>
          </div>
        </div>
        {userId === authorId ? (
          <div className={`${styles.control_btn_box}`}>
            <ContentModifyButton
              board={board}
              contentId={contentId}
              author={userId}
            />
            <ContentDeleteButton
              board={board}
              contentId={contentId}
              author={userId}
            />
          </div>
        ) : (
          <Empty />
        )}
      </div>
      <div className={`${styles.content_box}`}>
        {parsedContent.map((value, index) => {
          return (
            <div
              key={index}
              className={`${styles.item}`}>
              <ContentViewBar
                data={value}
                authorId={authorId}
              />
            </div>
          );
        })}
      </div>
      <LikeButton
        likeCount={likeSWR.data}
        isLiked={likedSWR.data}
        contentId={contentId}
        userId={userId}
        likeCountMutate={likeSWR.mutate}
        isLikedMutate={likedSWR.mutate}
      />
      <Comment contentId={contentId} />
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
