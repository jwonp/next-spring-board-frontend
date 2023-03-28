// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
const getCookie = async (identifier: string) => {
  return await axios.get("http://localhost:8080/hello/hello", {
    headers: {
      "X-IDENTIFIER": identifier,
    },
  });
};
const postCookie = async (identifier: string, csrfToken: string) => {
  await axios.post(
    "http://localhost:8080/hello/hello",
    {},
    {
      headers: {
        "X-IDENTIFIER": identifier,
        "X-CSRF-TOKEN": csrfToken,
      },
    }
  );
};

const cookieByMethod = (
  identifier: string,
  method: string,
  csrfToken?: string
): Promise<any> => {
  if (method === "GET") return getCookie(identifier);
  if (method === "POST") return postCookie(identifier, csrfToken);
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") res.status(400).end();

  const { identifier, method } = req.body;

  if (!identifier) res.status(400).end();
  try {
    cookieByMethod(identifier, method, req.cookies["X-CSRF-TOKEN"]).then(
      (response) => {
        res
          .setHeader(
            "set-cookie",
            `X-CSRF-TOKEN=${response.headers["x-csrf-token"]}; path=/; samesite=lax; httponly;`
          )
          .status(200)
          .end();
      }
    );
  } catch (error) {
    res.status(400).end();
  }
}
