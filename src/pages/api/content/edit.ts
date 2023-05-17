import { SaveContentType } from "@src/static/types/SaveContentType";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { CsrfIdentityType } from "@src/static/types/CsrfIdentityType";
import { BoardMenuType } from "@src/static/types/BoardMenuType";

const sendContent = async (
  title: string,
  board: BoardMenuType,
  content: string,
  csrf: CsrfIdentityType
) => {
  return await axios.post(
    `${process.env.BACKEND_URL}/content/edit`,
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
  const { title, contents, author, board }: SaveContentType = req.body;
  const csrfToken = req.cookies["X-CSRF-TOKEN"];
  const csrf: CsrfIdentityType = {
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
