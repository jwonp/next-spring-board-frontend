// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserType } from "@src/static/types/UserType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const addUser = async (data: UserType) => {
  await axios.post(`${process.env.BACKEND_URL}/user/register`, data);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.cookies);
  res.status(200).send("");
}
