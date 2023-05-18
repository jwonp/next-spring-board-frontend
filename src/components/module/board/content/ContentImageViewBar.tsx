import styles from "@src/styles/board/content/ContentImageViewBar.module.scss";
import Image from "next/image";
import { getWidth } from "@src/redux/features/windowWidth";
import { useAppSelector } from "@src/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { SizeType } from "@src/static/types/SizeType";
import {
  getNaturalImageSize,
  getImageSrc,
  getResizedImageSize,
} from "@src/components/func/ImageHandler";
import { NO_IMAGE } from "@src/static/strings/stringSet";
const ContentImageViewBar = ({
  authorId,
  image,
}: {
  authorId: string;
  image: string;
}) => {
  const $image = useRef<HTMLDivElement>(null);
  const windowWidth = useAppSelector(getWidth);
  const [naturalImageSize, setNaturalImageSize] = useState<SizeType>({
    width: 0,
    height: 0,
  });
  const [imageSize, setImageSize] = useState<SizeType>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resizedImageSize = getResizedImageSize(
      naturalImageSize,
      $image.current.offsetWidth
    );

    setImageSize(resizedImageSize);
  }, [image, windowWidth, naturalImageSize]);

  const onLoadingCompleteHandler = (img: HTMLImageElement) => {
    const naturalImageSize = getNaturalImageSize(img);
    setNaturalImageSize(naturalImageSize);
  };
  return (
    <div
      ref={$image}
      className={`${styles.image_box}`}>
      <Image
        onLoadingComplete={onLoadingCompleteHandler}
        src={getImageSrc(authorId, image)}
        alt={NO_IMAGE}
        width={imageSize.width}
        height={imageSize.height}
        unoptimized={true}
        priority={true}
      />
    </div>
  );
};

export default ContentImageViewBar;
