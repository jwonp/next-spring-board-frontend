// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { HeaderMiddleMenuType } from "@src/static/types/menuType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getBoardSize = async (board: HeaderMiddleMenuType, search?: string) => {
  return await axios.get(
    search
      ? `${process.env.BACKEND_URL}/board/size?board=${board}&search=${search}`
      : `${process.env.BACKEND_URL}/board/size?board=${board}`
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const { board, search } = req.query;
  try {
    getBoardSize(
      board as HeaderMiddleMenuType,
      search as string | undefined
    ).then((_res) => {
      res.status(200).send(_res.data);
    });
  } catch (err) {
    res.status(201).send(-1);
  }
}
