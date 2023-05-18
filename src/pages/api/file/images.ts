import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CsrfIdentityType } from "@src/static/types/CsrfIdentityType";
import { ImageConfirmType } from "@src/static/types/ImageUploadType";

const sendContent = async (data: ImageConfirmType, csrf: CsrfIdentityType) => {
  await axios.patch(`${process.env.FILE_SERVER_END_POINT}/files/images`, data, {
    headers: { "X-CSRF-TOKEN": csrf.csrfToken, "X-IDENTIFIER": csrf.id },
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: ImageConfirmType = req.body;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentityType = {
    id: data.author,
    csrfToken: csrfToken,
  };
  sendContent(data, csrf);
  res.status(200).send("good");
}
