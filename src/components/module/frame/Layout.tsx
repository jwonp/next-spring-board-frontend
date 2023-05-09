import styles from "@src/styles/frame/Layout.module.scss";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import AppDrawer from "./AppDrawer";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

import { useSession, signIn } from "next-auth/react";
const Layout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const indexPageHeight = useMemo(() => {
    if (router.asPath === "/") {
      return styles.main_with_footer;
    } else {
      return "";
    }
  }, [router.asPath]);
  const footer = useMemo(() => {
    if (router.asPath === "/") {
      return <Footer />;
    } else {
      <></>;
    }
  }, [router.asPath]);
  useEffect(() => {
    if (status === "unauthenticated" && router.asPath !== "/") {
      signIn();
    }
  }, [status, router.asPath]);
  return (
    <div className={`${styles.wrapper}`}>
      <Header />
      <div className={`${styles.main} ${indexPageHeight}`}>
        <AppDrawer />
        <Main>{children}</Main>
      </div>
      {footer}
    </div>
  );
};

export default Layout;
