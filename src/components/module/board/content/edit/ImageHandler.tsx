import {
  getImageFocusIndex,
  removeContentByIndex,
  resetImageFocusIndex,
} from "@src/redux/features/content";
import {
  getIsVisible,
  getPosition,
  getSize,
  setVisible,
} from "@src/redux/features/imageHandler";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { sizes } from "@src/static/data/stringSet";
import styles from "@src/styles/board/content/edit/ImageHandler.module.scss";
import Image from "next/image";
import { useEffect, useRef } from "react";
const ImageHandler = () => {
  const $wrapper = useRef<HTMLDivElement>(null);
  const size = useAppSelector(getSize);
  const position = useAppSelector(getPosition);
  const isVisible = useAppSelector(getIsVisible);
  const dispatch = useAppDispatch();
  const imageFocusIndex = useAppSelector(getImageFocusIndex);
  const onMouseLeaveEvent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    dispatch(resetImageFocusIndex());
    dispatch(setVisible(false));
  };
  const onImageClickEvent = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    dispatch(removeContentByIndex(imageFocusIndex));
    dispatch(resetImageFocusIndex());
    dispatch(setVisible(false));
  };

  useEffect(() => {
    $wrapper.current.style.width = `${size.width}px`;
    $wrapper.current.style.height = `${size.height}px`;
  }, [size]);
  useEffect(() => {
    $wrapper.current.style.top = `${position.y}px`;
    $wrapper.current.style.left = `${position.x}px`;
  }, [position]);
  return (
    <div
      ref={$wrapper}
      className={`${styles.wrapper} ${isVisible ? "" : styles.invisible}`}
      onMouseLeave={onMouseLeaveEvent}>
      <div className={`${styles.button_box}`}>
        <div className={`${styles.button}`}>
          <Image
            onClick={onImageClickEvent}
            src={"/delete.svg"}
            alt={"No close"}
            fill
            sizes={sizes}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageHandler;
