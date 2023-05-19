import { CsrfIdentity } from "@src/static/types/CsrfIdentityType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const deleteContent = async (
  contentId: string,
  userId: string,
  csrf: CsrfIdentity
) => {
  return await axios.delete(
    `${process.env.BACKEND_END_POINT}/content?content=${contentId}&user=${userId}`,
    {
      headers: { "X-CSRF-TOKEN": csrf.csrfToken, "X-IDENTIFIER": csrf.id },
    }
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const { content, user } = req.query;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentity = {
    id: user as string,
    csrfToken: csrfToken,
  };
  deleteContent(content as string, user as string, csrf)
    .then((_res) => {
      res.status(200).send(_res.data);
    })
    .catch((_err) => {
      res.status(_err.response.status).send(null);
    });
}
