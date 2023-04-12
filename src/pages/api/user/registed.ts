// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserType } from "@src/static/types/UserType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const isUserRegisted = async (id: string, provider: string) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/user/registed?id=${id}&provider=${provider}`,
    { headers: { "X-IDENTIFIER": id } }
  );
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, provider } = req.query;
  isUserRegisted(id as string, provider as string).then((_res) => {
    res.setHeader(
      "set-cookie",
      `X-CSRF-TOKEN=${_res.data}; path=/; samesite=lax; httponly;`
    );
    res.status(_res.status).send(_res.status === 200 ? false : true);
  });
  //   res.status(200).end();
}
