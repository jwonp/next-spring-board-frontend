import { ModifyCommentRequestType } from "@src/static/types/CommentType";
import { ImageConfirmType } from "@src/static/types/ImageUploadType";
import { ModifyContentRequestType } from "@src/static/types/ModifyContentType";
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

export const saveContent = async (data: SaveContentType) => {
  return await axios.post(`/api/content/edit`, data);
};

export const modifyContent = async (data: ModifyContentRequestType) => {
  return await axios.patch(`/api/content/modify`, data);
};

export const confirmImages = async (
  contentId: number,
  images: string[],
  author: string
) => {
  const data: ImageConfirmType = {
    images: images,
    contentId: contentId,
    author: author,
  };
  return await axios.patch(`/api/file/images`, data);
};

export const getContentById = async (contentId: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/content?id=${contentId}`
  );
};

export const getContentShortById = async (contentId: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/short?id=${contentId}`
  );
};

export const saveCommentByContentId = async (
  comment: string,
  contentId: number,
  user: string
) => {
  return await axios.post(`/api/comment/edit`, {
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
  return await axios.post(`/api/like/add`, {
    contentId: contentId,
    user: user,
  });
};
export const deleteLikeByContentAndUser = async (
  contentId: number,
  userId: String
) => {
  if (!userId) return;
  return await axios.delete(
    `/api/like/delete?content=${contentId}&user=${userId}`
  );
};

export const deleteContent = async (contentId: number, userId: string) => {
  if (!userId) return;
  return await axios.delete(
    `/api/content/delete?content=${contentId}&user=${userId}`
  );
};

export const modifyComment = async (data: ModifyCommentRequestType) => {
  return await axios.patch(`/api/comment/modify`, data);
};
export const deleteComment = async (commentId: number, userId: string) => {
  return await axios.delete(
    `/api/comment/delete?comment=${commentId}&user=${userId}`
  );
};

export const sendFile = async (formData: FormData) => {
  return await axios.post("/api/file/upload", formData, {
    headers: { "Content-Type": "multipart/form-data;charset=utf-8" },
  });
};
