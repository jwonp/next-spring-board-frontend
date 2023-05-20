import styles from "@src/styles/board/content/edit/ImageBar.module.scss";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import {
  setPosition,
  setSize,
  setVisible,
} from "@src/redux/features/imageHandler";
import { getContents, setImageFocusIndex } from "@src/redux/features/content";
import { useSession } from "next-auth/react";

import { Size } from "@src/static/types/SizeType";
import {
  getNaturalImageSize,
  getImageSrc,
  getResizedImageSize,
} from "@src/components/func/ImageHandler";
import { getWidth } from "@src/redux/features/windowWidth";
import { NO_IMAGE } from "@src/static/strings/stringSet";
import { IMAGE_SVG } from "@src/static/strings/IconSrc";
import { Location } from "@src/static/types/LocationType";
const ImageBar = ({ index }: { index: number }) => {
  const $image = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const content = useAppSelector(getContents)[index];
  const windowWidth = useAppSelector(getWidth);
  const dispatch = useAppDispatch();
  const [naturalImageSize, setNaturalImageSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  const [imageSize, setImageSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const mouseEnterEvent = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const imageHandlerSize: Size = {
      width: e.currentTarget.offsetWidth,
      height: e.currentTarget.offsetHeight,
    };
    const imageHandlerPosition: Location = {
      x: e.currentTarget.getBoundingClientRect().left,
      y: e.currentTarget.getBoundingClientRect().top,
    };

    dispatch(setSize(imageHandlerSize));
    dispatch(setPosition(imageHandlerPosition));
    dispatch(setImageFocusIndex(index));
    dispatch(setVisible(true));
  };

  useEffect(() => {
    const resizedImageSize = getResizedImageSize(
      naturalImageSize,
      $image.current.offsetWidth
    );

    setImageSize(resizedImageSize);
  }, [content.content, windowWidth, naturalImageSize]);

  const onLoadingCompleteHandler = async (img: HTMLImageElement) => {
    const naturalImageSize: Size = getNaturalImageSize(img);
    setNaturalImageSize(naturalImageSize);
  };

  return (
    <div
      ref={$image}
      className={`${styles.image_box}`}>
      <Image
        onMouseEnter={mouseEnterEvent}
        onLoadingComplete={onLoadingCompleteHandler}
        src={getImageSrc(session?.user?.id, content.content)}
        alt={NO_IMAGE}
        width={imageSize.width}
        height={imageSize.height}
        blurDataURL={IMAGE_SVG.src}
        unoptimized={true}
        priority={true}
        draggable={false}
      />
    </div>
  );
};

export default ImageBar;
