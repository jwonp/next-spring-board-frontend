import {
  isMouseOnTarget,
  isLoactionYOnBottomOfTarget,
  isLoactionYOnTopOfTarget,
  relocateControl,
} from "@src/components/func/ContentEditFuncs";
import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { LocationType } from "@src/static/types/LocationType";
import styles from "@src/styles/board/content/ContentEditBar.module.scss";
import { useRef, useEffect, SetStateAction, useMemo } from "react";
import TextBar from "./TextBar";
const ContentEditBar = ({
  index,
  type,
  mouseOnIndex,
  mouseLocation,
  scroll,
  control,
  onDragIndex,
  focus,
  moveToIndex,
  contents,
  setContents,
}: {
  index: number;
  type: string;
  mouseOnIndex: React.MutableRefObject<number>;
  mouseLocation: React.MutableRefObject<LocationType>;
  scroll: React.MutableRefObject<number>;
  control: React.MutableRefObject<HTMLDivElement>;

  focus: React.MutableRefObject<number>;
  moveToIndex: React.MutableRefObject<number>;
  contents: ContentBarDataType[];
  onDragIndex: React.MutableRefObject<number>;
  setContents: React.Dispatch<React.SetStateAction<ContentBarDataType[]>>;
}) => {
  const $wrapper = useRef<HTMLDivElement>(null);
  const $wrapperSizes = useRef<ContainerSizeType>(null);

  useEffect(() => {
    const sizes: ContainerSizeType = {
      left: $wrapper.current.offsetLeft,
      top: $wrapper.current.offsetTop,
      width: $wrapper.current.offsetWidth,
      height: $wrapper.current.offsetHeight,
    };
    $wrapperSizes.current = sizes;
  }, []);
  const handleClickWrapper = () => {
    ($wrapper.current.firstChild as HTMLDivElement).focus();
  };
  const handleMouseUpWrapper = () => {
    if (onDragIndex.current < 0) return;

    const content = $wrapper.current.firstChild as HTMLDivElement;
    if (!content) return;
    content.classList.toggle(styles.border_bottom, false);
    content.classList.toggle(styles.border_top, false);
  };
  const handleMouseMoveWrapper = () => {
    const _isMouseOnTarget = isMouseOnTarget(
      mouseLocation.current,
      $wrapperSizes.current,
      scroll.current
    );
    const isMouseOnTargetBefore =
      onDragIndex.current >= index &&
      isLoactionYOnTopOfTarget(
        mouseLocation.current.y,
        $wrapperSizes.current.top,
        $wrapperSizes.current.height,
        scroll.current
      );
    const isMouseOnTargetAfter =
      onDragIndex.current < index &&
      isLoactionYOnBottomOfTarget(
        mouseLocation.current.y,
        $wrapperSizes.current.top,
        $wrapperSizes.current.height,
        scroll.current
      );

    if (_isMouseOnTarget) {
      mouseOnIndex.current = index;

      const _targetLocation: LocationType = {
        x: $wrapperSizes.current.left,
        y: $wrapperSizes.current.top - scroll.current,
      };
      relocateControl(_targetLocation, control.current, onDragIndex.current);
    }

    moveToIndex.current = index;
    if (isMouseOnTargetBefore) {
      $wrapper.current.firstElementChild.classList.toggle(
        styles.border_top,
        true
      );
    }
    if (isMouseOnTargetAfter) {
      $wrapper.current.firstElementChild.classList.toggle(
        styles.border_bottom,
        true
      );
    }
  };

  return (
    <div
      ref={$wrapper}
      className={`${styles.wrapper}`}
      onClick={handleClickWrapper}
      onMouseMove={handleMouseMoveWrapper}
      onMouseUp={handleMouseUpWrapper}>
      <TextBar
        index={index}
        focus={focus}
        moveToIndex={moveToIndex}
        contents={contents}
        onDragIndex={onDragIndex}
        setContents={setContents}
      />
    </div>
  );
};

export default ContentEditBar;
