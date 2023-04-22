export const getImage = async (url: string) => {
  const img = new Image();
  img.src = `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display${url}`;
  await img.decode();
  return img;
};

export const getImageSizeByWindowWidth = (
  imageWidth: number,
  imageHeight: number,
  windowWidth: number
) => {
  if (imageWidth <= windowWidth) {
    return { width: imageWidth, height: imageHeight };
  }
  const rate = windowWidth / imageWidth;

  return { width: windowWidth, height: imageHeight * rate };
};
