import { SaveContentType } from "@src/static/types/SaveContentType";
import { UserType } from "@src/static/types/UserType";
import axios from "axios";

export const isUserRegisted = async (id: string, provider: string) => {
  return await axios.get(`/api/user/registed?id=${id}&provider=${provider}`);
};

export const isUserRegistedForServer = async (id: string, provider: string) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/user/registed?id=${id}&provider=${provider}`,
    { headers: { "X-IDENTIFIER": id } }
  );
};

export const addUser = async (data: UserType) => {
  await axios.post(`${process.env.FRONTEND_URL}/api/user/register`, data);
};

export const saveContents = async (data: SaveContentType) => {
  await axios.post(`/api/board/edit`, data);
};

export const getContentById = async (id: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/board/content?id=${id}`
  );
};

export const saveCommentByContentId = async (
  comment: string,
  contentId: number,
  user: string
) => {
  return await axios.post(`/api/board/comment/edit`, {
    comment: comment,
    contentId: contentId,
    user: user,
  });
};

export const addLikeByContentAndUser = async (
  contentId: number,
  user: String
) => {
  if (!user) return;
  return await axios.post(`/api/board/like/add`, {
    contentId: contentId,
    user: user,
  });
};
export const deleteLikeByContentAndUser = async (
  contentId: number,
  userId: String
) => {
  if (!userId) return;
  return await axios.get(
    `/api/board/like/delete?content=${contentId}&user=${userId}`
  );
};

export const deleteContent = async (contentId: number, userId: string) => {
  return await axios.get(
    `/api/board/delete?content=${contentId}&user=${userId}`
  );
};
