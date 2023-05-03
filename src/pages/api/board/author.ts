// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const isAuthorByContentId = async (contentId: string, author: string) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/board/content/author?content=${contentId}&author=${author}`
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const { content, author } = req.query;

  isAuthorByContentId(content as string, author as string).then((_res) => {
    res.status(200).send(_res.data);
  });
}
