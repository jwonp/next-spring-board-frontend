import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CsrfIdentity } from "@src/static/types/CsrfIdentityType";
import { ModifyCommentRequest } from "@src/static/types/CommentType";

const modifyComment = async (
  commentId: string,
  comment: string,
  csrf: CsrfIdentity
) => {
  return await axios.patch(
    `${process.env.BACKEND_END_POINT}/comment`,
    {
      comment: comment,
      commentId: commentId,
      writer: csrf.id,
    },
    {
      headers: { "X-CSRF-TOKEN": csrf.csrfToken, "X-IDENTIFIER": csrf.id },
    }
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const { commentId, comment, writer }: ModifyCommentRequest = req.body;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentity = {
    id: writer,
    csrfToken: csrfToken,
  };
  modifyComment(commentId.toString(), comment, csrf)
    .then((_res) => {
      res.status(200).send(_res.data);
    })
    .catch((_err) => {
      res.status(_err.response.status).send(null);
    });
}
