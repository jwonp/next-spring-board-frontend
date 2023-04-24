import styles from "@src/styles/board/content/ContentById.module.scss";
import { getContentById } from "@src/components/func/sendRequest";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { ContentViewType } from "@src/static/types/ContentViewType";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import qs from "qs";
import { useEffect, useMemo, useRef, useState } from "react";
import { getDateFromRowDateAsString } from "@src/components/func/DateParser";

import ContentViewBar from "@src/components/module/board/content/ContentViewBar";

import Comment from "@src/components/module/board/content/Comment";
import { useRouter } from "next/router";
type ParsedContentType = {
  [key: number]: ContentBarDataType;
};
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
  };

  return (
    <div id={"ContentById"} className={`${styles.wrapper}`}>
      <div className={`${styles.header_box}`}>
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
          <div className={`${styles.likes}`}>{`좋아요 ${likes}`}</div>
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
