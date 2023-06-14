import type { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";
import { ImageUploadResponse } from "@src/static/types/ImageUploadType";

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = (
  req: NextApiRequest,
  res: NextApiResponse<ImageUploadResponse>
) => {
  httpProxyMiddleware(req, res, {
    target: "http://127.0.0.1:8000",
    pathRewrite: [
      {
        patternStr: "^/api/board/file",
        replaceStr: "/files/upload/single",
      },
    ],
  }).then((result) => {
    res.send(result.data);
  });
};

export default handler;
