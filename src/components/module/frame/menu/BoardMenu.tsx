import { BoardMenuList } from "@src/static/strings/stringSet";
import styles from "@src/styles/frame/menu/BoardMenu.module.scss";
import Link from "next/link";

const BoardMenu = () => {
  return (
    <div className={`${styles.wrapper}`}>
      {BoardMenuList.map((value, index) => (
        <div
          key={index}
          className={`${styles.item}`}>
          <Link href={`/board/${value}`}>{value}</Link>
        </div>
      ))}
    </div>
  );
};

export default BoardMenu;
