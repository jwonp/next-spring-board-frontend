import styles from "@src/styles/frame/AppDrawer.module.scss";
import { HeaderMiddleMenu } from "@src/static/data/stringSet";
import Link from "next/link";
const AppDrawer = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.box}`}>
        {HeaderMiddleMenu.map((value, index) => (
          <div key={index} className={`${styles.item}`}>
            <Link href={`/board/${value}`}>{value}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppDrawer;
