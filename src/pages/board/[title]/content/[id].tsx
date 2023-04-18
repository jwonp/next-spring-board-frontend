import styles from "@src/styles/board/content/ContentById.module.scss";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
const ContentById = ({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) => {
  const router = useRouter();
  const { title, id } = router.query;

  // const id = useMemo(() => {
  //   return router.query.id;
  // }, [router.asPath]);
  return (
    <div>
      <div>{title}</div>
      <div>{id}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  return {
    props: {},
  };
};
export default ContentById;
