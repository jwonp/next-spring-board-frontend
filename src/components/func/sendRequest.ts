import axios from "axios";
import { GoogleLoginType, TwitchLoginType } from "@src/static/types/dataTypes";

export const addUserProfile = async (
  data: GoogleLoginType | TwitchLoginType
): Promise<any> => {
  return await axios.post(`${process.env.BACKEND_URL}/addUserProfile`, data);
};
