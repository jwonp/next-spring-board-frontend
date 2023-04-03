import { ContentBarDataType } from "@src/static/types/ContentDataType";
import styles from "@src/styles/board/content/TextBar.module.scss";
import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import { useEffect, useMemo, useRef, useState } from "react";
import { LocationType } from "@src/static/types/LocationType";
import {
  getBeforeIndex,
  isLoactionXOnTarget,
  isLoactionYOnBottomOfTarget,
  isLoactionYOnTarget,
  isLoactionYOnTopOfTarget,
  relocateControl,
} from "@src/components/func/ContentEditFuncs";
import { debounce } from "lodash";
const TextBar = ({
  data,
  index,
  focus,
  mouseOnIndex,
  mouseLocation,
  scroll,
  control,
  onDragIndex,
  lastIndex,
  moveToIndex,
}: {
  data: ContentBarDataType;
  index: number;
  focus: React.MutableRefObject<number>;
  mouseOnIndex: React.MutableRefObject<number>;
  mouseLocation: React.MutableRefObject<LocationType>;
  scroll: React.MutableRefObject<number>;
  control: React.MutableRefObject<HTMLDivElement>;
  onDragIndex: React.MutableRefObject<number>;
  lastIndex: React.MutableRefObject<number>;
  moveToIndex: React.MutableRefObject<number>;
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
    $content.current.innerText = data.content;
  }, [data.content]);
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
    // only when nothing dragged
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
    console.log(focus.current);
    if (onDragIndex.current >= index) {
      if (
        isLoactionYOnTopOfTarget(
          mouseLocation.current.y,
          $wrapperSizes.current.top,
          $wrapperSizes.current.height,
          scroll.current
        )
      ) {
        moveToIndex.current = getBeforeIndex(index);
        console.log(`${onDragIndex.current} to ${moveToIndex.current}`);

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
        moveToIndex.current = index;
        console.log(`${onDragIndex.current} to ${moveToIndex.current}`);
        $content.current.classList.toggle(styles.border_bottom, true);
      }
    }
    // if (onDragIndex.current === index) {
    //       console.log("is me");
    //     }
    //     if (onDragIndex.current === 0) {
    //       console.log("is first");
    //     }
    //     if (onDragIndex.current === lastIndex.current) {
    //       console.log("is last");
    //     }
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
        onInput={(e) => {
          data.content = e.currentTarget.innerText;
        }}></div>
    </div>
  );
};

export default TextBar;
