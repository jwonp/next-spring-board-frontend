import { CsrfIdentity } from "@src/static/types/CsrfIdentityType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type LikeRequest = {
  contentId: number;
  user: string;
};
const addLikeByContentAndUser = async (
  likeRequest: LikeRequest,
  csrf: CsrfIdentity
) => {
  return await axios.post(
    `${process.env.BACKEND_END_POINT}/like`,
    likeRequest,
    {
      headers: { "X-CSRF-TOKEN": csrf.csrfToken, "X-IDENTIFIER": csrf.id },
    }
  );
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contentId, user } = req.body;

  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const likeRequest: LikeRequest = {
    contentId: contentId,
    user: user,
  };
  const csrf: CsrfIdentity = {
    id: user,
    csrfToken: csrfToken,
  };
  addLikeByContentAndUser(likeRequest, csrf).then((_res) => {
    res.status(200).send(_res.data);
  });
}
