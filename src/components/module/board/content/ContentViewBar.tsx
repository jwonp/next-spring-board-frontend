import {
  getImage,
  getImageSizeByWindowWidth,
} from "@src/components/func/ImageHandler";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import styles from "@src/styles/board/content/ContentViewBar.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useState } from "react";
const ContentViewBar = ({
  data,
  windowWidth,
}: {
  data: ContentBarDataType;
  windowWidth: MutableRefObject<number>;
}) => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (data.image === "" || data.image === undefined) return;
    getImage(data.image).then((img) => {
      const _size = getImageSizeByWindowWidth(
        img.naturalWidth,
        img.naturalHeight,
        windowWidth.current
      );
      setSize({ width: _size.width, height: _size.height });
    });
  }, [data, windowWidth]);

  const getViewBar = () => {
    if (data.type === "image") {
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display${data.image}`}
          alt={"No Image"}
          width={size.width}
          height={size.height}
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
