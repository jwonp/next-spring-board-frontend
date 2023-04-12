// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isUserRegistedForServer } from "@src/components/func/sendRequest";
import { UserType } from "@src/static/types/UserType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const addUser = async (data: UserType, csrfToken: string) => {
  console.log(`csrfToken : ${csrfToken} , X-IDENTIFIER : ${data.id}`);

  return await axios.post(`${process.env.BACKEND_URL}/user/register`, data, {
    headers: { "X-CSRF-TOKEN": csrfToken, "X-IDENTIFIER": data.id },
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: UserType = req.body;
  isUserRegistedForServer(data.id, data.provider).then((_res) => {
    const csrfToken = _res.data;
    addUser(data, csrfToken).then((_res) => {
      res.status(_res.status);
    });
  });
}