// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { contentType } from "@src/static/types/contentType";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  // const {page, title} =  req.query

  res.status(200).send(10);
}
