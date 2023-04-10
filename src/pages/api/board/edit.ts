// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SaveContentType } from "@src/static/types/SaveContentType";
import { contentType } from "@src/static/types/contentType";
import qs from "qs";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const sendContent = async (title: string, content: string) => {
  await axios.post(`${process.env.BACKEND_URL}/board/edit`, {
    title: title,
    content: content,
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, contents }: SaveContentType = req.body;
  console.log(req.headers.cookie);
  sendContent(title, qs.stringify(contents));
  res.status(200).send("good");
}
