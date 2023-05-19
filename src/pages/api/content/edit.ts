import { ContentSaveData } from "@src/static/types/SaveContentType";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CsrfIdentity } from "@src/static/types/CsrfIdentityType";
import { BoardMenu } from "@src/static/types/BoardMenuType";

const sendContent = async (
  title: string,
  board: BoardMenu,
  content: string,
  csrf: CsrfIdentity
) => {
  return await axios.post(
    `${process.env.BACKEND_END_POINT}/content/edit`,
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
  const { title, contents, author, board }: ContentSaveData = req.body;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentity = {
    id: author,
    csrfToken: csrfToken,
  };
  sendContent(title, board, contents, csrf)
    .then((_res) => {
      res.status(200).send(_res.data);
    })
    .catch((_err) => {
      res.status(_err.response.status).send(null);
    });
}
