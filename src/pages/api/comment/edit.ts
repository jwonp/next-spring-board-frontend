import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CsrfIdentity } from "@src/static/types/CsrfIdentityType";
import { CommentRequest } from "@src/static/types/CommentType";

type SaveCommentRequest = {
  contentId: number;
  comment: string;
  writer: string;
};

const saveComment = async (data: SaveCommentRequest, csrf: CsrfIdentity) => {
  return await axios.post(`${process.env.BACKEND_END_POINT}/comment`, data, {
    headers: { "X-CSRF-TOKEN": csrf.csrfToken, "X-IDENTIFIER": csrf.id },
  });
};

const handler = (req: NextApiRequest, res: NextApiResponse<boolean>) => {
  const { comment, contentId, user }: CommentRequest = req.body;
  if (!user) res.status(201).send(false);
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentity = {
    id: user,
    csrfToken: csrfToken,
  };
  const data: SaveCommentRequest = {
    contentId: contentId,
    comment: comment,
    writer: user,
  };

  saveComment(data, csrf)
    .then((_res) => {
      res.status(200).send(_res.data);
    })
    .catch((_err) => {
      res.status(_err.respons.status).send(null);
    });
};

export default handler;
