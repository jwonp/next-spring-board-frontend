import styles from "@src/styles/board/content/edit/TextBar.module.scss";
import { ContentBarDataType } from "@src/static/types/ContentDataType";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@src/redux/hooks";
import {
  ModifyDataType,
  modifyContentByIndex,
} from "@src/redux/features/content";

const TextBar = ({
  index,
  focus,
  content,
  onDragIndex,
}: {
  index: number;
  focus: React.MutableRefObject<number>;
  content: ContentBarDataType;
  onDragIndex: React.MutableRefObject<number>;
}) => {
  const $content = useRef<HTMLDivElement>(null);
  const [placeholder, setPlaceholder] = useState<string>("");
  const dispatch = useAppDispatch();
  /**
   * ContentEditBar의 위치(index)가 바뀔 떄마다 재랜더링
   */
  useEffect(() => {
    $content.current.innerText = content.content;
  }, [content, index]);

  const handleFocus = () => {
    focus.current = index;
    console.log(focus.current);
    setPlaceholder("내용을 입력해주세요.");
  };
  const handleBlur = () => {
    focus.current = -1;
    console.log(focus.current);
    setPlaceholder("");
  };

  const handleMouseEnterOnContent = () => {
    // 아무 것도 드래그하지 않을 때만 css: cotent_hover를 적용함
    $content.current.classList.toggle(
      styles.content_hover,
      onDragIndex.current < 0
    );
  };

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    const modifyData: ModifyDataType = {
      index: index,
      content: e.currentTarget.innerText,
    };
    // dispatch(modifyContentByIndex(modifyData));
  };
  return (
    <div
      ref={$content}
      className={`${styles.content}`}
      contentEditable={true}
      suppressContentEditableWarning={true}
      placeholder={placeholder}
      onMouseEnter={handleMouseEnterOnContent}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleInput}></div>
  );
};

export default TextBar;