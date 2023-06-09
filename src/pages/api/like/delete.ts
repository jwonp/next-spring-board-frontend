import { CsrfIdentity } from "@src/static/types/CsrfIdentityType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const deleteLikeByContentAndUser = async (
  contentId: string,
  user: string,
  csrf: CsrfIdentity
) => {
  return await axios.delete(
    `${process.env.BACKEND_END_POINT}/like?content=${contentId}&user=${user}`,
    {
      headers: { "X-CSRF-TOKEN": csrf.csrfToken, "X-IDENTIFIER": csrf.id },
    }
  );
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { content, user } = req.query;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentity = {
    id: user as string,
    csrfToken: csrfToken,
  };
  deleteLikeByContentAndUser(content as string, user as string, csrf).then(
    (_res) => {
      res.status(200).send(_res.data);
    }
  );
}
