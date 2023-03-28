// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { contentType } from "@src/static/types/contentType";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<contentType[]>
) {
  // const {page, title} =  req.query

  res.status(200).send([
    {
      index: 1,
      title: "title1",
      views: 1001,
      likes: 203,
      author: "joowon",
      update_date: "2023/02/11",
    },
    {
      index: 2,
      title: "tiltl2",
      views: 1234,
      likes: 34,
      author: "dlqfursla",
      update_date: "2023/02/12",
    },
    {
      index: 3,
      title: "title3",
      views: 212354,
      likes: 23,
      author: "iki",
      update_date: "2023/02/13",
    },
    {
      index: 4,
      title: "title3",
      views: 212354,
      likes: 23,
      author: "iki",
      update_date: "2023/02/13",
    },
    {
      index: 5,
      title: "title3",
      views: 212354,
      likes: 23,
      author: "iki",
      update_date: "2023/02/13",
    },
    {
      index: 6,
      title: "title3",
      views: 212354,
      likes: 23,
      author: "iki",
      update_date: "2023/02/13",
    },
    {
      index: 7,
      title: "title3",
      views: 212354,
      likes: 23,
      author: "iki",
      update_date: "2023/02/13",
    },
    {
      index: 8,
      title: "title3",
      views: 212354,
      likes: 23,
      author: "iki",
      update_date: "2023/02/13",
    },
    {
      index: 9,
      title: "title3",
      views: 212354,
      likes: 23,
      author: "iki",
      update_date: "2023/02/13",
    },
    {
      index: 10,
      title: "title3",
      views: 212354,
      likes: 23,
      author: "iki",
      update_date: "2023/02/13",
    },
  ]);
}
