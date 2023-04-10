import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { ImageSizeType } from "@src/static/types/ImageSizeType";

import styles from "@src/styles/board/content/ImageBar.module.scss";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
const ImageBar = ({
  content,
  index,
}: {
  content: ContentBarDataType;
  index: number;
}) => {
  const $image = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>(320);
  const [height, setHeight] = useState<number>(10);

  return (
    <div ref={$image} className={`${styles.image_box}`}>
      <Image
        src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display${content.image}`}
        alt={"No Image"}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL="/image.svg"
        priority={true}
        draggable={false}
      />
    </div>
  );
};

export default ImageBar;
