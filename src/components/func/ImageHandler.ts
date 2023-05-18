import { IMAGE_SVG } from "@src/static/strings/IconSrc";
import { SizeType } from "@src/static/types/SizeType";

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
export const getNaturalImageSize = (img: HTMLImageElement) => {
  const size: SizeType = { width: img.naturalWidth, height: img.naturalHeight };
  return size;
};

export const getResizedImageSize = (
  naturalSize: SizeType,
  windowWidth: number
): SizeType => {
  if (naturalSize.width <= windowWidth) {
    return { width: naturalSize.width, height: naturalSize.height };
  }
  const rate = windowWidth / naturalSize.width;

  return { width: windowWidth, height: naturalSize.height * rate };
};

export const getImageSrc = (userId: string, imageId: string) => {
  if (!userId || !imageId) {
    return IMAGE_SVG.src;
  }
  return `${process.env.NEXT_PUBLIC_FILE_SERVER_END_POINT}/files/display/${userId}/${imageId}`;
};
