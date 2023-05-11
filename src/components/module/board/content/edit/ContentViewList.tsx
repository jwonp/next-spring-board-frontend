import { ContentType } from "@src/static/types/ContentType";
import ContentBar from "../../ContentBar";
import { useEffect, useMemo } from "react";

const ContentViewList = ({
  contentList,
  boardTitle,
}: {
  contentList: ContentType[];
  boardTitle?: string;
}) => {
  const contentBarList = useMemo(() => {
    return contentList?.map((item, index) => {
      return (
        <div key={index}>
          <ContentBar
            data={item}
            boardTitle={boardTitle ? boardTitle : item.board}
          />
        </div>
      );
    });
  }, [contentList]);
  return <div>{contentBarList}</div>;
};

export default ContentViewList;
