import { ContentBarDataType } from "@src/static/types/ContentDataType";
import styles from "@src/styles/board/content/TextBar.module.scss";
import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { LocationType } from "@src/static/types/LocationType";

import {
  invisibleBorder,
  isLoactionXOnTarget,
  isLoactionYOnBottomOfTarget,
  isLoactionYOnTarget,
  isLoactionYOnTopOfTarget,
  relocateControl,
} from "@src/components/func/ContentEditFuncs";
const TextBar = ({
  index,
  focus,
  moveToIndex,
  contents,
  onDragIndex,
  setContents,
}: {
  index: number;
  focus: React.MutableRefObject<number>;
  moveToIndex: React.MutableRefObject<number>;
  contents: ContentBarDataType[];
  onDragIndex: React.MutableRefObject<number>;
  setContents: React.Dispatch<React.SetStateAction<ContentBarDataType[]>>;
}) => {
  const $content = useRef<HTMLDivElement>(null);
  const [placeholder, setPlaceholder] = useState<string>("");

  /**
   * ContentEditBar의 위치(index)가 바뀔 떄마다 재랜더링
   */
  useEffect(() => {
    $content.current.innerText = contents[index].content;
  }, [contents, index]);

  const handleFocus = () => {
    focus.current = index;
    setPlaceholder("내용을 입력해주세요.");
  };
  const handleBlur = () => {
    focus.current = -1;
    setPlaceholder("");
  };

  const handleMouseEnterOnContent = () => {
    // 아무 것도 드래그하지 않을 때만 css: cotent_hover를 적용함
    $content.current.classList.toggle(
      styles.content_hover,
      onDragIndex.current < 0
    );
  };
  const handleMouseLeaveOnContent = () => {
    invisibleBorder($content.current);
  };

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    const tempContents = [...contents];
    tempContents[index].content = e.currentTarget.innerText;
    setContents(tempContents);
  };
  return (
    <div
      ref={$content}
      className={`${styles.content}`}
      contentEditable={true}
      suppressContentEditableWarning={true}
      placeholder={placeholder}
      onMouseEnter={handleMouseEnterOnContent}
      onMouseLeave={handleMouseLeaveOnContent}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleInput}></div>
  );
};

export default TextBar;
