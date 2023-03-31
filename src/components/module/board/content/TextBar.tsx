import { ContentDataType } from "@src/static/types/ContentDataType";
import styles from "@src/styles/board/content/TextBar.module.scss";
import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import { useEffect, useMemo, useRef, useState } from "react";
import { LocationType } from "@src/static/types/LocationType";
import {
  isLoactionXOnTarget,
  isLoactionYOnTarget,
  relocateControl,
} from "@src/components/func/ContentEditFuncs";
const TextBar = ({
  data,
  index,
  focus,
  mouseOnTarget,
  mouseLocation,
  scroll,
  control,
  isOnDrag,
}: {
  data: ContentDataType;
  index: number;
  focus: React.MutableRefObject<number>;
  mouseOnTarget: React.MutableRefObject<number>;
  mouseLocation: React.MutableRefObject<LocationType>;
  scroll: React.MutableRefObject<number>;
  control: React.MutableRefObject<HTMLDivElement>;
  isOnDrag: React.MutableRefObject<boolean>;
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
  const handleMouseEnterOnContent = () => {
    $content.current.classList.toggle(styles.content_hover, true);
  };
  const handleMouseLeaveOnContent = () => {
    $content.current.classList.toggle(styles.content_hover, false);
  };

  return (
    <div
      ref={$wrapper}
      className={`${styles.wrapper}`}
      onClick={handleClickWrapper}
      onMouseMove={() => {
        const isInWrapper =
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
          );
        console.log(isInWrapper);
        if (isInWrapper) {
          mouseOnTarget.current = index;

          relocateControl(
            $wrapper.current,
            control.current,
            isOnDrag.current,
            scroll.current
          );
        }
      }}>
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
        onInput={(e) => {
          data.content = e.currentTarget.innerText;
        }}></div>
    </div>
  );
};

export default TextBar;
