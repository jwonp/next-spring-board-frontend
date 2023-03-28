import { HeaderMiddleMenu, HeaderRightMenu } from "@src/static/data/stringSet";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@src/styles/frame/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const Header = () => {
  const { data: session } = useSession();

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
            <Image
              src={"/favicon.png"}
              alt={"No Logo"}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>
          <div>
            <Link href={`/`}>logo</Link>
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
