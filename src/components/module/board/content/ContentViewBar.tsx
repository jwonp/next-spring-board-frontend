import styles from "@src/styles/board/content/ContentViewBar.module.scss";
import {
  getImage,
  getImageSizeByWindowWidth,
} from "@src/components/func/ImageHandler";
import { getWidth } from "@src/redux/features/windowWidth";
import { useAppSelector } from "@src/redux/hooks";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import Image from "next/image";

import { useEffect, useState } from "react";
const ContentViewBar = ({ data }: { data: ContentBarDataType }) => {
  const windowWidth = useAppSelector(getWidth);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const resizeImage = () => {
    if (data.image === "" || data.image === undefined) return;
    getImage(data.image).then((img) => {
      const _size = getImageSizeByWindowWidth(
        img.naturalWidth,
        img.naturalHeight,
        windowWidth
      );
      setSize({ width: _size.width, height: _size.height });
    });
  };

  useEffect(resizeImage, [data, windowWidth]);

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

  return <div>{getViewBar()}</div>;
};

export default ContentViewBar;
