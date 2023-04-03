import { ContentBarDataType } from "@src/static/types/ContentDataType";
import styles from "@src/styles/board/content/TextBar.module.scss";
import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { LocationType } from "@src/static/types/LocationType";

import {
  isLoactionXOnTarget,
  isLoactionYOnBottomOfTarget,
  isLoactionYOnTarget,
  isLoactionYOnTopOfTarget,
  relocateControl,
} from "@src/components/func/ContentEditFuncs";
const TextBar = ({
  index,
  focus,
  mouseOnIndex,
  mouseLocation,
  scroll,
  control,
  onDragIndex,
  moveToIndex,
  contents,
  setContents,
}: {
  index: number;
  focus: React.MutableRefObject<number>;
  mouseOnIndex: React.MutableRefObject<number>;
  mouseLocation: React.MutableRefObject<LocationType>;
  scroll: React.MutableRefObject<number>;
  control: React.MutableRefObject<HTMLDivElement>;
  onDragIndex: React.MutableRefObject<number>;
  moveToIndex: React.MutableRefObject<number>;
  contents: ContentBarDataType[];
  setContents: React.Dispatch<React.SetStateAction<ContentBarDataType[]>>;
}) => {
  const $content = useRef<HTMLDivElement>(null);
  const $wrapper = useRef<HTMLDivElement>(null);
  const $wrapperSizes = useRef<ContainerSizeType>(null);

  const [placeholder, setPlaceholder] = useState<string>("");

  useEffect(() => {
    const sizes: ContainerSizeType = {
      left: $wrapper.current.offsetLeft,
      top: $wrapper.current.offsetTop,
      width: $wrapper.current.offsetWidth,
      height: $wrapper.current.offsetHeight,
    };
    $wrapperSizes.current = sizes;
  }, []);

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
  const handleClickWrapper = () => {
    $content.current.focus();
  };
  const handleMouseUpWrapper = () => {
    if (onDragIndex.current < 0) return;
    $content.current.classList.toggle(styles.border_bottom, false);
    $content.current.classList.toggle(styles.border_top, false);
  };
  const handleMouseEnterOnContent = () => {
    // only when nothing dragged content hover will visible
    $content.current.classList.toggle(
      styles.content_hover,
      onDragIndex.current < 0
    );
  };
  const handleMouseLeaveOnContent = () => {
    $content.current.classList.toggle(styles.content_hover, false);
    $content.current.classList.toggle(styles.border_bottom, false);
    $content.current.classList.toggle(styles.border_top, false);
  };
  const handleMouseMoveWrapper = () => {
    if (
      isLoactionXOnTarget(
        mouseLocation.current.x,
        $wrapperSizes.current.left,
        $wrapperSizes.current.width
      ) &&
      isLoactionYOnTarget(
        mouseLocation.current.y,
        $wrapperSizes.current.top,
        $wrapperSizes.current.height,
        scroll.current
      )
    ) {
      mouseOnIndex.current = index;

      relocateControl(
        $wrapper.current,
        control.current,
        onDragIndex.current,
        scroll.current
      );
    }
  };
  const handleMouseMoveContent = () => {
    moveToIndex.current = index;
    if (onDragIndex.current >= index) {
      if (
        isLoactionYOnTopOfTarget(
          mouseLocation.current.y,
          $wrapperSizes.current.top,
          $wrapperSizes.current.height,
          scroll.current
        )
      ) {
        $content.current.classList.toggle(styles.border_top, true);
      }
    }
    if (onDragIndex.current < index) {
      if (
        isLoactionYOnBottomOfTarget(
          mouseLocation.current.y,
          $wrapperSizes.current.top,
          $wrapperSizes.current.height,
          scroll.current
        )
      ) {
        // moveToIndex.current = index;
        //  getNextIndex(index, contents.length);
        $content.current.classList.toggle(styles.border_bottom, true);
      }
    }
  };
  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    const tempContents = [...contents];
    tempContents[index].content = e.currentTarget.innerText;
    setContents(tempContents);
  };
  return (
    <div
      ref={$wrapper}
      className={`${styles.wrapper}`}
      onClick={handleClickWrapper}
      onMouseMove={handleMouseMoveWrapper}
      onMouseUp={handleMouseUpWrapper}>
      <div
        ref={$content}
        className={`${styles.content}`}
        contentEditable={true}
        suppressContentEditableWarning={true}
        placeholder={placeholder}
        onMouseEnter={handleMouseEnterOnContent}
        onMouseLeave={handleMouseLeaveOnContent}
        onMouseMove={handleMouseMoveContent}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}></div>
    </div>
  );
};

export default TextBar;
