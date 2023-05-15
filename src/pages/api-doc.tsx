import styles from "@src/styles/swagger.module.scss";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";

import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(spec);
  return (
    <div className={`${styles.wrapper}`}>
      <SwaggerUI spec={spec} />;
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API",
        version: "1.0",
      },
    },
    apiFolder: "src/pages/api",
  };
  try {
    console.log(swaggerOptions);
    const spec: Record<string, any> = createSwaggerSpec(swaggerOptions);

    return {
      props: {
        spec,
      },
    };
  } catch {
    console.log("NO options");
  }
  return {
    props: {},
  };
};

export default ApiDoc;
