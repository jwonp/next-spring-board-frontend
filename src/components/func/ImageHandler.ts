import { SizeType } from "@src/static/types/SizeType";

export const getImage = async (url: string) => {
  const img = new Image();
  img.src = `${process.env.NEXT_PUBLIC_FILE_SERVER_END_POINT}/files/display${url}`;
  await img.decode();
  return img;
};

export const getImageSizeByWindowWidth = (
  imageWidth: number,
  imageHeight: number,
  windowWidth: number
): SizeType => {
  if (imageWidth <= windowWidth) {
    return { width: imageWidth, height: imageHeight };
  }
  const rate = windowWidth / imageWidth;

  return { width: windowWidth, height: imageHeight * rate };
};
