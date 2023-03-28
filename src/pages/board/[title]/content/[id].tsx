import styles from "@src/styles/board/content/ContentById.module.scss";
import { useRouter } from "next/router";
import { useMemo } from "react";
const ContentById = () => {
  const router = useRouter();
  const id = useMemo(() => {
    return router.query.id;
  }, [router.asPath]);
  return <div>{id}</div>;
};

export default ContentById;
