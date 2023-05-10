import { CommentType } from "@src/static/types/CommentType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
type CommentResponseType = {
  commentId: number;
  comment: string;
  contentId: number;
  created: string;
  updated: string;
  writer: string;
  writerId: string;
};
const getCommentListByContentId = async (contentId: string) => {
  return await axios.get(
    `${process.env.BACKEND_URL}/board/comment?id=${contentId}`
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentType[] | null>
) {
  const { id } = req.query;
  getCommentListByContentId(id as string).then((_res) => {
    const commentResponseList = _res.data as CommentResponseType[];
    const commentList: CommentType[] = commentResponseList.map((value) => {
      return {
        commentId: value.commentId,
        contentId: value.contentId,
        comment: value.comment,
        writer: value.writer,
        writerId: value.writerId,
        created: value.created,
        updated: value.updated,
      };
    });
    res.status(200).send(commentList);
  });
}
