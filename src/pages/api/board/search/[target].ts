// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { contentType } from "@src/static/types/contentType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const searchByTarget = async (target: string) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/board/search?target=${target}`
  );
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const target = req.query?.target as string;
  searchByTarget(target).then((response) => {
    res.status(200).send(response.data);
  });
}
