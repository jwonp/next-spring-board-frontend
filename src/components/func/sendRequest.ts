import { SaveContentType } from "@src/static/types/SaveContentType";
import { UserType } from "@src/static/types/UserType";
import { HeaderMiddleMenuType } from "@src/static/types/menuType";
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
  await axios
    .post(`/api/board/edit`, data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
