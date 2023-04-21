export const getImage = async (url: string) => {
  console.log(url);
  const img = new Image();
  img.src = `${process.env.NEXT_PUBLIC_FILE_SERVER_URL}/files/display${url}`;
  await img.decode();
  return img;
};
