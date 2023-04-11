import { UserType } from "@src/static/types/UserType";
import axios from "axios";
export const isUserRegisted = async (id: string, provider: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/registed?id=${id}&provider=${provider}`
  );
};
export const addUser = async (data: UserType) => {
  await axios.post(`${process.env.FRONTEND_URL}/api/user/register`, data);
};
