import styles from "@src/styles/board/content/edit/ImageBar.module.scss";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { SizeType } from "@src/static/types/SizeType";
import Image from "next/image";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import {
  setPosition,
  setSize,
  setVisible,
} from "@src/redux/features/imageHandler";
import { getContents } from "@src/redux/features/content";
import { useSession } from "next-auth/react";
const ImageBar = ({ index }: { index: number }) => {
  const $image = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const size: SizeType = { width: 320, height: 10 };
  const content = useAppSelector(getContents)[index];
  const dispatch = useAppDispatch();
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
    dispatch(setVisible(true));
  };

  return (
    <div ref={$image} className={`${styles.image_box}`}>
      <Image
        onMouseEnter={mouseEnterEvent}
        src={`${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display/${session.user.id}/${content.image}`}
        alt={"No Image"}
        width={size.width}
        height={size.height}
        placeholder="blur"
        blurDataURL="/image.svg"
        priority={true}
        draggable={false}
      />
    </div>
  );
};

export default ImageBar;
