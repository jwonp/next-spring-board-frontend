import { ModifyCommentRequest } from "@src/static/types/CommentType";
import { ImageConfirm } from "@src/static/types/ImageUploadType";
import { ModifyContentRequest } from "@src/static/types/ModifyContentType";
import { ContentSaveData } from "@src/static/types/SaveContentType";
import { User } from "@src/static/types/UserType";
import axios from "axios";

export const isUserRegisted = async (id: string, provider: string) => {
  return await axios.get(`/api/user/registed?id=${id}&provider=${provider}`);
};

export const isUserRegistedForServer = async (id: string, provider: string) => {
  return await axios.get(
    `${process.env.BACKEND_END_POINT}/user/registed?id=${id}&provider=${provider}`,
    { headers: { "X-IDENTIFIER": id } }
  );
};

export const addUser = async (data: User) => {
  await axios.post(`${process.env.FRONTEND_END_POINT}/api/user/register`, data);
};

export const saveContent = async (data: ContentSaveData) => {
  return await axios.post(`/api/content/edit`, data);
};

export const modifyContent = async (data: ModifyContentRequest) => {
  return await axios.patch(`/api/content/modify`, data);
};

export const confirmImages = async (
  contentId: number,
  images: string[],
  author: string
) => {
  const data: ImageConfirm = {
    images: images,
    contentId: contentId,
    author: author,
  };
  return await axios.patch(`/api/file/images`, data);
};

export const getContentById = async (contentId: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/content?id=${contentId}`
  );
};

export const getContentShortById = async (contentId: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/content/short?id=${contentId}`
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

export const modifyComment = async (data: ModifyCommentRequest) => {
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
