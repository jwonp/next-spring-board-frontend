import styles from "@src/styles/board/content/ContentViewBar.module.scss";

import { getWidth } from "@src/redux/features/windowWidth";
import { useAppSelector } from "@src/redux/hooks";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import Image from "next/image";

import { useEffect, useState } from "react";
import { SizeType } from "@src/static/types/SizeType";
import { resizeImage } from "@src/components/func/ContentViewFuncs";
const ContentViewBar = ({
  data,
  authorId,
}: {
  data: ContentBarDataType;
  authorId: string;
}) => {
  const windowWidth = useAppSelector(getWidth);
  const [size, setSize] = useState<SizeType>({
    width: 100,
    height: 100,
  });

  useEffect(() => {
    if (!data.image) return;
    const imageUrl = `/${authorId}/${data.image}`;
    resizeImage(imageUrl, windowWidth, setSize);
  }, [data.image, windowWidth]);

  const getViewBar = () => {
    if (data.type === "image") {
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display/${authorId}/${data.image}`}
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
