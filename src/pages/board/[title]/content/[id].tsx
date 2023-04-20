import styles from "@src/styles/board/content/ContentById.module.scss";
import { getContentById } from "@src/components/func/sendRequest";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { ContentViewType } from "@src/static/types/ContentViewType";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import qs from "qs";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { getDateFromRowDateAsString } from "@src/components/func/DateParser";
import { getImageMeta } from "@src/components/func/ImageHandler";
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
  const $wrapper = useRef<HTMLDivElement>(null);
  const $image = useRef<HTMLDivElement>(null);
  const parsedContent = useMemo(() => {
    const parsedData = qs.parse(content, {
      parseArrays: true,
    }) as unknown as ParsedContentType;
    return Object.values(parsedData) as ContentBarDataType[];
  }, [content]);

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const createContentBar = (data: ContentBarDataType, index: number) => {
    //default data type is text
    if (data.type === "image") {
      getImageMeta(data.image).then((img) => {
        const _size = { width: img.naturalWidth, height: img.naturalHeight };
        setSize(_size);
      });
      return (
        <div ref={$wrapper} key={index} className={`${styles.item}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display${data.image}`}
            alt={"No Image"}
            width={size.width}
            height={size.height}
            priority={true}
          />
        </div>
      );
    }

    return (
      <div key={index} className={`${styles.item}`}>
        {data.content}
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
