import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CsrfIdentity } from "@src/static/types/CsrfIdentityType";
import { ModifyContentRequest } from "@src/static/types/ModifyContentType";

const sendContent = async (
  contentId: string,
  title: string,
  content: string,
  csrf: CsrfIdentity
) => {
  return await axios.patch(
    `${process.env.BACKEND_END_POINT}/content/modify`,
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
  const { contentId, title, contents, author }: ModifyContentRequest = req.body;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentity = {
    id: author,
    csrfToken: csrfToken,
  };
  sendContent(contentId.toString(), title, contents, csrf)
    .then((_res) => {
      res.status(200).send(_res.data);
    })
    .catch((_err) => {
      res.status(_err.response.status).send(null);
    });
}
