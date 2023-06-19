import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const isUserRegisted = async (id: string, provider: string) => {
  return await axios.get(
    `${process.env.BACKEND_END_POINT}/user/registed?id=${id}&provider=${provider}`,
    { headers: { "X-IDENTIFIER": id } }
  );
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, provider } = req.query;
  isUserRegisted(id as string, provider as string)
    .then((_res) => {
      res.setHeader(
        "set-cookie",
        `X-CSRF-TOKEN=${_res.data}; path=/; samesite=lax; httponly;`
      );
      res.status(_res.status).send(true);
    })
    .catch((_err: AxiosError) => {
      console.log(_err.response);
      res.status(_err.response.status).send(false);
    });
}
