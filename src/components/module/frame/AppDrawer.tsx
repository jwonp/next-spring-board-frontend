import styles from "@src/styles/frame/AppDrawer.module.scss";

import BoardMenu from "./menu/BoardMenu";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import {
  getIsAppDrawerOpened,
  setIsAppDrawerOpened,
} from "@src/redux/features/menuToggle";
const AppDrawer = () => {
  const isAppDrawerOpened = useAppSelector(getIsAppDrawerOpened);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${styles.wrapper}`}
      data-opened={isAppDrawerOpened}>
      <div
        className={`${styles.box}`}
        onClick={() => {
          console.log("box");
        }}>
        <BoardMenu />
      </div>
      <div
        className={`${styles.modal}`}
        onClick={() => {
          dispatch(setIsAppDrawerOpened(false));
        }}></div>
    </div>
  );
};

export default AppDrawer;
