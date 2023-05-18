import styles from "@src/styles/board/content/ContentViewBar.module.scss";

import { ContentBarDataType } from "@src/static/types/ContentDataType";
import ContentImageViewBar from "./ContentImageViewBar";
import { useMemo } from "react";

const ContentViewBar = ({
  data,
  authorId,
}: {
  data: ContentBarDataType;
  authorId: string;
}) => {
  const ViewBar = useMemo(() => {
    if (data.type === "image") {
      return (
        <ContentImageViewBar
          authorId={authorId}
          image={data.image}
        />
      );
    }
    return <div>{data.content}</div>;
  }, [data]);

  return ViewBar;
};

export default ContentViewBar;
