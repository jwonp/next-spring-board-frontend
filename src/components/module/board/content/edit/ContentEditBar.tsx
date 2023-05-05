import styles from "@src/styles/board/content/edit/ContentEditBar.module.scss";
import {
  isMouseOnTarget,
  isLoactionYOnBottomOfTarget,
  isLoactionYOnTopOfTarget,
  relocateControl,
  invisibleBorder,
} from "@src/components/func/ContentEditFuncs";
import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { LocationType } from "@src/static/types/LocationType";
import { useRef } from "react";
import TextBar from "./TextBar";
import ImageBar from "./ImageBar";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { getContents } from "@src/redux/features/content";
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
}: // contents,
{
  index: number;
  type: string;
  mouseOnIndex: React.MutableRefObject<number>;
  mouseLocation: React.MutableRefObject<LocationType>;
  scroll: React.MutableRefObject<number>;
  control: React.MutableRefObject<HTMLDivElement>;
  focus: React.MutableRefObject<number>;
  moveToIndex: React.MutableRefObject<number>;
  // contents: ContentBarDataType[];
  onDragIndex: React.MutableRefObject<number>;
}) => {
  const $wrapper = useRef<HTMLDivElement>(null);
  const contents = useAppSelector(getContents);

  const handleClickWrapper = () => {
    ($wrapper.current.firstChild as HTMLDivElement).focus();
  };
  const handleMouseLeave = () => {
    invisibleBorder($wrapper.current.firstChild as HTMLDivElement);
  };
  const handleMouseUpWrapper = () => {
    if (onDragIndex.current < 0) return;

    const content = $wrapper.current.firstChild as HTMLDivElement;
    if (!content) return;
    content.classList.toggle(styles.border_bottom, false);
    content.classList.toggle(styles.border_top, false);
  };
  const handleMouseMoveWrapper = () => {
    const _wrapperSizes: ContainerSizeType = {
      left: $wrapper.current.offsetLeft,
      top: $wrapper.current.offsetTop,
      width: $wrapper.current.offsetWidth,
      height: $wrapper.current.offsetHeight,
    };
    if (!$wrapper.current) return;
    const _isMouseOnTarget = isMouseOnTarget(
      mouseLocation.current,
      _wrapperSizes,
      scroll.current
    );
    const isMouseOnTargetBefore =
      onDragIndex.current >= index &&
      isLoactionYOnTopOfTarget(
        mouseLocation.current.y,
        _wrapperSizes.top,
        _wrapperSizes.height,
        scroll.current
      );
    const isMouseOnTargetAfter =
      onDragIndex.current >= 0 &&
      onDragIndex.current < index &&
      isLoactionYOnBottomOfTarget(
        mouseLocation.current.y,
        _wrapperSizes.top,
        _wrapperSizes.height,
        scroll.current
      );

    if (_isMouseOnTarget) {
      mouseOnIndex.current = index;

      const _targetLocation: LocationType = {
        x: _wrapperSizes.left,
        y: _wrapperSizes.top - scroll.current,
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
  const getBarByType = (type: string) => {
    if (type === "text") {
      return <TextBar index={index} focus={focus} onDragIndex={onDragIndex} />;
    }
    if (type === "image") {
      return <ImageBar index={index} />;
    }
  };
  return (
    <div
      ref={$wrapper}
      className={`${styles.wrapper}`}
      onClick={handleClickWrapper}
      onMouseMove={handleMouseMoveWrapper}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUpWrapper}>
      {getBarByType(type)}
    </div>
  );
};

export default ContentEditBar;
