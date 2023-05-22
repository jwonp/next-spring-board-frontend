import { HeaderRightMenu, SIZES } from "@src/static/strings/stringSet";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@src/styles/frame/Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { isUserRegisted } from "@src/components/func/RequestFuncs";
import BoardMenu from "./menu/BoardMenu";
import { useAppDispatch } from "@src/redux/hooks";
import { toggleIsAppDrawerOpened } from "@src/redux/features/menuToggle";
import Empty from "../Empty";

const Header = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const adminPageLink = useMemo(() => {
    if (session?.user?.id === process.env.NEXT_PUBLIC_ADMIN_PROVIDER_ID) {
      return (
        <div>
          <Link href={"/admin"}>admin</Link>
        </div>
      );
    } else {
      <Empty />;
    }
  }, [session]);
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
              src={"/favicon.jpeg"}
              alt={"No Logo"}
              fill
              sizes={SIZES}
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
          {adminPageLink}
          <div className={`${styles.item}`}>
            <Link href={"/mypage"}>{HeaderRightMenu.myPage}</Link>
          </div>
          {/* <div className={`${styles.item}`}>{HeaderRightMenu.alert}</div> */}
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
