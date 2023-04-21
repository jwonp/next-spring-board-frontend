import { getImage } from "@src/components/func/ImageHandler";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import styles from "@src/styles/board/content/ContentViewBar.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
const ContentViewBar = ({ data }: { data: ContentBarDataType }) => {
  const router = useRouter();
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (data.image === "" || data.image === undefined) return;
    getImage(data.image).then((img) => {
      setSize({ width: img.naturalWidth, height: img.naturalHeight });
    });
  }, [data.image]);

  const getViewBar = () => {
    if (data.type === "image") {
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display${data.image}`}
          alt={"No Image"}
          width={size.width * 0.8}
          height={size.height * 0.8}
          priority={true}
        />
      );
    }

    return data.content;
  };
  //   const  = ;
  return <div>{getViewBar()}</div>;
};

export default ContentViewBar;
