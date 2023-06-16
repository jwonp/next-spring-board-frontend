import { getWindowWidth } from "@src/components/func/ImageHandler";
import { setWidth } from "@src/redux/features/windowWidth";
import { useAppDispatch } from "@src/redux/hooks";
import { MAIN_ID } from "@src/static/strings/HtmlElementId";
import styles from "@src/styles/frame/Main.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Main = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.isReady) {
      if (!document) return;
      const mainWrapper = document.getElementById(MAIN_ID);
      dispatch(setWidth(getWindowWidth(mainWrapper)));
      window.addEventListener("resize", () => {
        dispatch(setWidth(getWindowWidth(mainWrapper)));
      });
    }
  }, [router.isReady]);
  return (
    <div
      id={MAIN_ID}
      className={`${styles.wrapper}`}>
      {children}
    </div>
  );
};

export default Main;
