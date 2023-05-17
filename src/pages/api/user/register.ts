import { isUserRegistedForServer } from "@src/components/func/RequestFuncs";
import { UserType } from "@src/static/types/UserType";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const addUser = async (data: UserType) => {
  return await axios.post(`${process.env.BACKEND_URL}/user/register`, data);
};
// const addUser = async (data: UserType, csrfToken: string) => {
//   console.log(`csrfToken : ${csrfToken} , X-IDENTIFIER : ${data.id}`);

//   return await axios.post(`${process.env.BACKEND_URL}/user/register`, data, {
//     headers: { "X-CSRF-TOKEN": csrfToken, "X-IDENTIFIER": data.id },
//   });
// };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: UserType = req.body;
  addUser(data)
    .then((_res) => {
      res.status(_res.status).send(_res.data);
    })
    .catch((_err) => {
      res.status(_err.response.status).send(_err.response.data);
    });
  // addUser(data, csrfToken).then((addUserResponse) => {
  //   res.status(addUserResponse.status);
  // });
  // isUserRegistedForServer(data.id, data.provider).then(
  //   (isUserRegistedResponse) => {
  //     const csrfToken = isUserRegistedResponse.data;
  //   }
  // );
}
