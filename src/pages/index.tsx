import { Inter } from "next/font/google";
import Link from "next/link";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const getCookie = async () => {
  //   await axios.post("/api/csrf-token", { identifier: "12345", method: "GET" });
  // };
  // const postCookie = async () => {
  //   await axios.post("/api/csrf-token", {
  //     identifier: "12345",
  //     method: "POST",
  //   });
  // };
  return (
    <div>
      인덱스페이지입니다.
      <Link href={"/login"}>로그인</Link>
      {/* <div onClick={getCookie}>토큰 받아오기</div>
      <br />
      <div onClick={postCookie}>토큰 받아오기</div> */}
      <div onClick={() => signIn()}>oauth 로그인 </div>
    </div>
  );
}
