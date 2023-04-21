import styles from "@src/styles/board/content/ContentById.module.scss";
import {
  getContentById,
  saveCommentByContentId,
} from "@src/components/func/sendRequest";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { ContentViewType } from "@src/static/types/ContentViewType";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import qs from "qs";
import { useMemo, useRef } from "react";
import { getDateFromRowDateAsString } from "@src/components/func/DateParser";
import useSWR from "swr";
import {
  CommentAmountFetcher,
  CommentAmountURLByContent,
} from "@src/components/fetcher/CommentAmountFetcher";
import ContentViewBar from "@src/components/module/board/content/ContentViewBar";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  const $textarea = useRef<HTMLTextAreaElement>(null);
  const parsedContent = useMemo(() => {
    const parsedData = qs.parse(content, {
      parseArrays: true,
    }) as unknown as ParsedContentType;
    return Object.values(parsedData) as ContentBarDataType[];
  }, [content]);

  const { data, error } = useSWR(
    CommentAmountURLByContent(id),
    CommentAmountFetcher
  );

  const createContentBar = (data: ContentBarDataType, index: number) => {
    //default data type is text
    return (
      <div key={index} className={`${styles.item}`}>
        <ContentViewBar data={data} />
      </div>
    );
  };

  return (
    <div className={`${styles.wrapper}`}>
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
          return createContentBar(value, index);
        })}
      </div>
      <div className={`${styles.comment_box}`}>
        <div>댓글 {data}</div>
        <div>
          <textarea
            ref={$textarea}
            placeholder={"댓글을 입력하세요."}
            maxLength={500}
            required={true}></textarea>
        </div>
        <button
          onClick={() => {
            saveCommentByContentId(
              $textarea.current.value,
              id,
              session.user.id
            );
          }}>
          등록
        </button>
      </div>
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
