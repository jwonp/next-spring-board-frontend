import styles from "@src/styles/board/content/edit/ImageBar.module.scss";

import Image from "next/image";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import {
  setPosition,
  setSize,
  setVisible,
} from "@src/redux/features/imageHandler";
import { getContents, setImageFocusIndex } from "@src/redux/features/content";
import { useSession } from "next-auth/react";
import { resizeImage } from "@src/components/func/ContentViewFuncs";
import { getWidth } from "@src/redux/features/windowWidth";
import { SizeType } from "@src/static/types/SizeType";
const ImageBar = ({ index }: { index: number }) => {
  const $image = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const content = useAppSelector(getContents)[index];
  const windowWidth = useAppSelector(getWidth);
  const dispatch = useAppDispatch();
  const [imageSize, setImageSize] = useState<SizeType>({
    width: 100,
    height: 100,
  });

  const mouseEnterEvent = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    dispatch(
      setSize({
        width: e.currentTarget.offsetWidth,
        height: e.currentTarget.offsetHeight,
      })
    );
    dispatch(
      setPosition({
        x: e.currentTarget.getBoundingClientRect().left,
        y: e.currentTarget.getBoundingClientRect().top,
      })
    );
    dispatch(setImageFocusIndex(index));
    dispatch(setVisible(true));
  };
  // useEffect(() => {
  //   if (!content.image) return;
  // }, [content.image, windowWidth]);
  return (
    <div
      ref={$image}
      className={`${styles.image_box}`}>
      <Image
        onMouseEnter={mouseEnterEvent}
        onLoadingComplete={() => {
          const imageUrl = `/${session.user.id}/${content.image}`;
          resizeImage(imageUrl, $image.current.offsetWidth, setImageSize);
        }}
        src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display/${session.user.id}/${content.image}`}
        alt={"No Image"}
        width={imageSize.width}
        height={imageSize.height}
        placeholder="blur"
        blurDataURL="/image.svg"
        priority={true}
        draggable={false}
      />
    </div>
  );
};

export default ImageBar;
