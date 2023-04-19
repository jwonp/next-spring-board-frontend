// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ContentType } from "@src/static/types/ContentType";
import { HeaderMiddleMenuType } from "@src/static/types/menuType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
type ListDtoType = {
  content_meta_id: number;
  title: string;
  author: string;
  board: string;
  created: string;
  updated: string;
  views: number;
  likes: number;
};

const getContentListByBoardAndIndex = async (
  board: HeaderMiddleMenuType,
  index: number
) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/board/list?index=${index}&board=${board}`
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentType[] | null>
) {
  const { index, board } = req.query;

  try {
    getContentListByBoardAndIndex(
      board as HeaderMiddleMenuType,
      Number(index)
    ).then((_res) => {
      const responseData: ListDtoType[] = _res.data;

      const returnData: ContentType[] = responseData.map((value) => {
        return {
          id: value.content_meta_id,
          title: value.title,
          views: value.views,
          likes: value.likes,
          author: value.author,
          board: value.board,
          updateDate: value.updated,
        };
      });
      res.status(200).send(returnData);
    });
  } catch (error) {
    res.status(201).send(null);
  }
}
