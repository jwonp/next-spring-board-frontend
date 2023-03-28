import { ContentDataType } from "@src/static/types/ContentDataType";
import styles from "@src/styles/board/content/ContentEditBar.module.scss";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
const ContentEditBar = ({
  str,
  index,
  target,
}: {
  str: ContentDataType;
  index: number;
  target: React.MutableRefObject<number>;
}) => {
  const $content = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`${styles.wrapper}`}
      onClick={() => {
        $content.current.focus();
      }}
      onMouseEnter={() => {
        target.current = index;
      }}
      onMouseLeave={() => {
        target.current = -1;
      }}>
      <div
        ref={$content}
        className={`${styles.content}`}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        onInput={(e) => {
          str.content = e.currentTarget.innerText;
        }}>
        {str.content}
      </div>
    </div>
  );
};

export default ContentEditBar;
