import styles from "@src/styles/board/content/ContentById.module.scss";
import { getContentById } from "@src/components/func/sendRequest";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { ContentViewType } from "@src/static/types/ContentViewType";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import qs from "qs";
import { useEffect, useMemo } from "react";
import Image from "next/image";
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

  useEffect(() => {
    console.log(parsedContent);
  }, [parsedContent]);

  const createContentBar = (data: ContentBarDataType, index: number) => {
    //default data type is text
    if (data.type === "image") {
      return (
        <div key={index} className={`${styles.item}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display${data.image}`}
            alt={"No Image"}
            width={100}
            height={100}
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
        <div>{title}</div>
        <div>{board}</div>
        <div>{id}</div>
        <div>{updated}</div>
        <div>{author}</div>
        <div>{views}</div>
        <div>{likes}</div>
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
