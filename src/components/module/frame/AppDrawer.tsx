import styles from "@src/styles/frame/AppDrawer.module.scss";
const AppDrawer = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.item}`}>App Menu 1</div>
      <div className={`${styles.item}`}>App Menu 2</div>
      <div className={`${styles.item}`}>App Menu 3</div>
      <div className={`${styles.item}`}>App Menu 4</div>
      <div className={`${styles.item}`}>App Menu 5</div>
      <div className={`${styles.item}`}>App Menu 6</div>
      <div className={`${styles.item}`}>App Menu 7</div>
    </div>
  );
};

export default AppDrawer;
