import {
  HeaderMiddleMenu,
  HeaderRightMenu,
  sizes,
} from "@src/static/data/stringSet";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@src/styles/frame/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { IdentifyType } from "@src/static/types/UserType";
import { isUserRegisted } from "@src/components/func/sendRequest";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@src/pages/api/auth/[...nextauth]";
import { Session } from "next-auth";

const Header = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      isUserRegisted(session?.user?.id, session?.user?.provider);
    }
  }, [session]);

  const { signFunc, signStr } = useMemo(() => {
    if (session) {
      return { signFunc: () => signOut(), signStr: HeaderRightMenu.logout };
    } else {
      return { signFunc: () => signIn(), signStr: HeaderRightMenu.login };
    }
  }, [session]);

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.box}`}>
          <div className={`${styles.logo}`}>
            <Image src={"/favicon.png"} alt={"No Logo"} fill sizes={sizes} />
          </div>
          <div>
            <Link href={`/`}>{session?.user?.name}</Link>
          </div>
        </div>
        <div className={`${styles.box}`}>
          {HeaderMiddleMenu.map((value, index) => (
            <div key={index} className={`${styles.item}`}>
              <Link href={`/board/${value}`}>{value}</Link>
            </div>
          ))}
        </div>
        <div className={`${styles.box}`}>
          <div className={`${styles.item}`}>{HeaderRightMenu.alert}</div>
          <div className={`${styles.item}`} onClick={signFunc}>
            {signStr}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
