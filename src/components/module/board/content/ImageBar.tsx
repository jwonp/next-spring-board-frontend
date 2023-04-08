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

  const [imageSize, setImageSize] = useState<ImageSizeType>({
    width: 100,
    height: 100,
  });

  // const DynamicImage = useMemo(() => {
  //   return (

  //   );
  // }, [content.image, imageSize.height, imageSize.width]);

  return (
    <div ref={$image} className={`${styles.image_box}`}>
      <Image
        src={content.image}
        alt={"No Image"}
        width={imageSize.width}
        height={imageSize.height}
        //   fill
        //   sizes="(max-width: 768px) 100vw,
        //         (max-width: 1200px) 50vw,
        //         33vw"
        priority={true}
        draggable={false}
      />
    </div>
  );
};

export default ImageBar;
