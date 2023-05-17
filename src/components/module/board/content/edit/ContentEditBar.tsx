import styles from "@src/styles/board/content/edit/ContentEditBar.module.scss";
import {
  isMouseOnTarget,
  relocateControl,
  invisibleBorder,
  displayBorderOnTarget,
} from "@src/components/func/ContentEditFuncs";
import { ContainerSizeType } from "@src/static/types/ContainerSizeType";

import { LocationType } from "@src/static/types/LocationType";
import { useRef } from "react";
import TextBar from "./TextBar";
import ImageBar from "./ImageBar";
import { MouseLocationCheckType } from "@src/static/types/MouseLocationCheckType";
import { __Zero } from "@src/static/numbers/numberSet";
import { ContentType } from "@src/static/types/ContentDataType";

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
}: {
  index: number;
  type: string;
  mouseOnIndex: React.MutableRefObject<number>;
  mouseLocation: React.MutableRefObject<LocationType>;
  scroll: React.MutableRefObject<number>;
  control: React.MutableRefObject<HTMLDivElement>;
  focus: React.MutableRefObject<number>;
  moveToIndex: React.MutableRefObject<number>;
  onDragIndex: React.MutableRefObject<number>;
}) => {
  const $wrapper = useRef<HTMLDivElement>(null);

  const handleClickWrapper = () => {
    ($wrapper.current.firstChild as HTMLDivElement).focus();
  };
  const handleMouseLeave = () => {
    invisibleBorder($wrapper.current.firstChild as HTMLDivElement);
  };
  const handleMouseUpWrapper = () => {
    if (onDragIndex.current < __Zero) return;

    const content = $wrapper.current.firstChild as HTMLDivElement;
    if (!content) return;
    content.classList.toggle(styles.border_bottom, false);
    content.classList.toggle(styles.border_top, false);
  };

  const handleMouseMoveWrapper = () => {
    if (!$wrapper.current) return;

    const _wrapperSizes: ContainerSizeType = {
      left: $wrapper.current.offsetLeft,
      top: $wrapper.current.offsetTop,
      width: $wrapper.current.offsetWidth,
      height: $wrapper.current.offsetHeight,
    };

    const _locations: MouseLocationCheckType = {
      mouseY: mouseLocation.current.y,
      wrapperTop: _wrapperSizes.top,
      wrapperHeight: _wrapperSizes.height,
      scroll: scroll.current,
    };

    displayBorderOnTarget(
      $wrapper.current,
      onDragIndex.current,
      index,
      _locations
    );

    const _isMouseOnTarget = isMouseOnTarget(
      mouseLocation.current,
      _wrapperSizes,
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
  };
  const getBarByType = (type: string) => {
    if (type === ContentType.text) {
      return (
        <TextBar
          index={index}
          focus={focus}
          onDragIndex={onDragIndex}
        />
      );
    }
    if (type === ContentType.image) {
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
