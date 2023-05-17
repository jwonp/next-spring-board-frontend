import { CsrfIdentityType } from "@src/static/types/CsrfIdentityType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const deleteComment = async (
  commentId: string,
  userId: string,
  csrf: CsrfIdentityType
) => {
  return await axios.delete(
    `${process.env.BACKEND_URL}/comment?comment=${commentId}&user=${userId}`,
    {
      headers: { "X-CSRF-TOKEN": csrf.csrfToken, "X-IDENTIFIER": csrf.id },
    }
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const { comment, user } = req.query;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentityType = {
    id: user as string,
    csrfToken: csrfToken,
  };
  deleteComment(comment as string, user as string, csrf)
    .then((_res) => {
      res.status(200).send(_res.data);
    })
    .catch((_err) => {
      res.status(_err.response.status).send(null);
    });
}
