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
