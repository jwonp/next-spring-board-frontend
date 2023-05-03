import styles from "@src/styles/frame/AppDrawer.module.scss";

import BoardMenu from "./menu/BoardMenu";
const AppDrawer = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.box}`}>
        <BoardMenu />
      </div>
    </div>
  );
};

export default AppDrawer;
