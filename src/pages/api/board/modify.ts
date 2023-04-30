import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CsrfIdentityType } from "@src/static/types/CsrfIdentityType";
import { ModifyContentRequestType } from "@src/static/types/ModifyContentType";

const sendContent = async (
  contentId: string,
  title: string,
  content: string,
  csrf: CsrfIdentityType
) => {
  await axios.patch(
    `${process.env.BACKEND_URL}/board/modify`,
    {
      title: title,
      contentId: contentId,
      contents: content,
      author: csrf.id,
    },
    {
      headers: { "X-CSRF-TOKEN": csrf.csrfToken, "X-IDENTIFIER": csrf.id },
    }
  );
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contentId, title, contents, writer }: ModifyContentRequestType =
    req.body;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentityType = {
    id: writer,
    csrfToken: csrfToken,
  };
  sendContent(contentId.toString(), title, contents, csrf);
  res.status(200).send("good");
}
