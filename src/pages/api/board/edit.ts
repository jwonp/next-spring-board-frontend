// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SaveContentType } from "@src/static/types/SaveContentType";

import qs from "qs";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CsrfIdentityType } from "@src/static/types/CsrfIdentityType";
import { HeaderMiddleMenuType } from "@src/static/types/menuType";

const sendContent = async (
  title: string,
  board: HeaderMiddleMenuType,
  content: string,
  csrf: CsrfIdentityType
) => {
  await axios.post(
    `${process.env.BACKEND_URL}/board/edit`,
    {
      title: title,
      board: board,
      content: content,
      author: csrf.id,
    },
    {
      headers: { "X-CSRF-TOKEN": csrf.csrfToken, "X-IDENTIFIER": csrf.id },
    }
  );
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, contents, writer, board }: SaveContentType = req.body;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentityType = {
    id: writer,
    csrfToken: csrfToken,
  };
  sendContent(title, board, contents, csrf);
  res.status(200).send("good");
}
