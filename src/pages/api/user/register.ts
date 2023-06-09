import { User } from "@src/static/types/UserType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const addUser = async (data: User) => {
  return await axios.post(
    `${process.env.BACKEND_END_POINT}/user/register`,
    data
  );
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: User = req.body;
  addUser(data)
    .then((_res) => {
      res.status(_res.status).send(_res.data);
    })
    .catch((_err) => {
      res.status(_err.response.status).send(_err.response.data);
    });
}
