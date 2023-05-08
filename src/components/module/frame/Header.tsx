import { HeaderRightMenu, sizes } from "@src/static/data/stringSet";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@src/styles/frame/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { isUserRegisted } from "@src/components/func/sendRequest";
import BoardMenu from "./menu/BoardMenu";
import { useAppDispatch } from "@src/redux/hooks";
import { toggleIsAppDrawerOpened } from "@src/redux/features/menuToggle";

const Header = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

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
            <Image
              src={"/favicon.png"}
              alt={"No Logo"}
              fill
              sizes={sizes}
            />
          </div>
          <div>
            <Link href={`/`}>{session?.user?.name}</Link>
          </div>
        </div>
        <div className={`${styles.box}`}>
          <div
            className={`${styles.toggle_btn}`}
            onClick={() => {
              dispatch(toggleIsAppDrawerOpened());
            }}>
            Menu
          </div>
          <BoardMenu />
        </div>
        <div className={`${styles.box}`}>
          <div className={`${styles.item}`}>{HeaderRightMenu.alert}</div>
          <div
            className={`${styles.item}`}
            onClick={signFunc}>
            {signStr}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
