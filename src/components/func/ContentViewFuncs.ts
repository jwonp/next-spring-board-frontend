import { getImage, getImageSizeByWindowWidth } from "./ImageHandler";

import { SizeType } from "@src/static/types/SizeType";
import { Dispatch, SetStateAction } from "react";

export const getWindowWidth = (mainWrapper: HTMLElement) => {
  try {
    const paddingWidth =
      Number(
        window
          .getComputedStyle(mainWrapper, null)
          .getPropertyValue("padding")
          .split("px")[0]
      ) * 2;

    return mainWrapper.offsetWidth - paddingWidth;
  } catch {
    return;
  }
};
export const getPaginationIndex = (
  pageIndex: number,
  lastPointNumber: number
) => {
  return Math.floor(pageIndex / 10) * 10 + lastPointNumber;
};

export const resizeImage = (
  imageSrc: string,
  windowWidth: number,
  setSize: Dispatch<SetStateAction<SizeType>>
) => {
  console.log("call resize");
  if (imageSrc === "" || imageSrc === undefined) return;
  getImage(imageSrc).then((img) => {
    const _size = getImageSizeByWindowWidth(
      img.naturalWidth,
      img.naturalHeight,
      windowWidth
    );

    if (_size.width === 0 && _size.height === 0) return;
    setSize({ width: _size.width, height: _size.height });
  });
};
