import { Inter } from "next/font/google";
import Link from "next/link";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      인덱스페이지입니다.
      <Link href={"/login"}>로그인</Link>
      <div onClick={() => signIn()}>oauth 로그인 </div>
    </div>
  );
}
