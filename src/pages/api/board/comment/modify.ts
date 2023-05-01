import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CsrfIdentityType } from "@src/static/types/CsrfIdentityType";
import { ModifyCommentRequestType } from "@src/static/types/CommentType";

const modifyComment = async (
  commentId: string,
  comment: string,
  csrf: CsrfIdentityType
) => {
  return await axios.patch(
    `${process.env.BACKEND_URL}/board/comment`,
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
  const { commentId, comment, writer }: ModifyCommentRequestType = req.body;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentityType = {
    id: writer,
    csrfToken: csrfToken,
  };
  modifyComment(commentId.toString(), comment, csrf).then((_res) => {
    res.status(200).send(_res.data);
  });
}
