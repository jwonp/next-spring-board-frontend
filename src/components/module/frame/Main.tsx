import styles from "@src/styles/frame/Main.module.scss";
const Main = ({ children }: { children: JSX.Element }) => {
  return <div className={`${styles.wrapper}`}>{children}</div>;
};

export default Main;
