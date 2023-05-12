import styles from "@src/styles/frame/Layout.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AppDrawer from "./AppDrawer";

import Header from "./Header";
import Main from "./Main";

import { useSession, signIn } from "next-auth/react";
const Layout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" && router.asPath !== "/") {
      signIn();
    }
  }, [status, router.asPath]);
  return (
    <div className={`${styles.wrapper}`}>
      <Header />
      <div className={`${styles.main}`}>
        <AppDrawer />
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default Layout;
