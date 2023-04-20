export const getImageMeta = async (url: string) => {
  const img = new Image();
  img.src = `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display${url}`;
  await img.decode();
  return img;
};
