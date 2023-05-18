import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const isAuthorByContentId = async (contentId: string, author: string) => {
  return await axios.get(
    `${process.env.BACKEND_END_POINT}/content/author?content=${contentId}&author=${author}`
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const { content, author } = req.query;

  isAuthorByContentId(content as string, author as string)
    .then((_res) => {
      res.status(200).send(_res.data);
    })
    .catch((_err) => {
      res.status(400).send(null);
    });
}
