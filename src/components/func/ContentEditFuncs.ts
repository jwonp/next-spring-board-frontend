import styles from "@src/styles/board/content/ContentEdit.module.scss";
import {
  VariationFlag,
  VariationFlagType,
} from "@src/static/types/VariationFlagType";
import { LocationType } from "@src/static/types/LocationType";
import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
export const pointEndOfBeforeTheTarget = (
  beforeTheTarget: Node,
  range: Range,
  selection: Selection,
  caretLocation: number
) => {
  if (!beforeTheTarget) return;
  range.setStart(beforeTheTarget, caretLocation);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

export const isVariationFlagDecrease = (variationFlag: VariationFlagType) => {
  return variationFlag === VariationFlag.decrease;
};

export const getFocusTarget = (
  focusTargetIndex: number,
  variationFlag: VariationFlagType,
  contentsLength: number
) => {
  const focusTarget = focusTargetIndex + variationFlag;

  if (focusTarget >= contentsLength) {
    return contentsLength - 1;
  }
  if (focusTarget < 0) {
    return 0;
  }
  return focusTarget;
};

export const isCaretOnFront = (anchorOffset: number, focusOffset: number) => {
  return anchorOffset === focusOffset && focusOffset === 0;
};

export const isLoactionXOnTarget = (x: number, left: number, width: number) => {
  return left < x && x < left + width;
};
export const isLoactionYOnTarget = (
  y: number,
  top: number,
  height: number,
  scroll: number
) => {
  return top - scroll < y && y < top + height - scroll;
};

export const isLoactionYOnBottomOfTarget = (
  y: number,
  top: number,
  height: number,
  scroll: number
) => {
  return top + height / 2 - scroll < y && y < top + height - scroll;
};

export const isLoactionYOnTopOfTarget = (
  y: number,
  top: number,
  height: number,
  scroll: number
) => {
  return top - scroll < y && y < top + height / 2 - scroll;
};

export const isOutOfContendEditBars = (
  container: HTMLDivElement,
  mouseLocation: LocationType,
  scroll: number
) => {
  const sizes: ContainerSizeType = {
    left: container.offsetLeft,
    top: container.offsetTop,
    width: container.offsetWidth,
    height: container.offsetHeight,
  };
  if (
    isLoactionXOnTarget(mouseLocation.x, sizes.left, sizes.width) &&
    isLoactionYOnTarget(mouseLocation.y, sizes.top, sizes.height, scroll)
  ) {
    return false;
  }
  return true;
};

export const isFocusOnFirstEditBar = (focusTarget: number) => {
  return focusTarget === 0;
};
export const isContentEmpty = (
  contentsLength: number,
  contentOnFirst: string
) => {
  return contentsLength === 1 && contentOnFirst === "";
};

export const setControlInvisible = (
  controlDiv: HTMLDivElement,
  bool: boolean
) => {
  controlDiv.classList.toggle(styles.fadein, !bool);
  controlDiv.classList.toggle(styles.fadeout, bool);
  setTimeout(() => {
    controlDiv.classList.toggle(styles.invisible, bool);
  }, 100);
};

export const relocateControl = (
  targetDiv: HTMLDivElement,
  controlDiv: HTMLDivElement,
  onDragIndex: number,
  scroll: number
) => {
  if (onDragIndex > -1) return;

  const targetLocation: LocationType = {
    x: targetDiv.offsetLeft,
    y: targetDiv.offsetTop,
  };

  controlDiv.style.left = `${targetLocation.x}px`;
  controlDiv.style.top = `${targetLocation.y - scroll}px`;

  setControlInvisible(controlDiv, false);
};

export const swapElementsSequenceInContents = (
  target: number,
  moveTo: number,
  contents: ContentBarDataType[]
) => {
  if (target < 0 || moveTo < 0 || target === moveTo) return contents;
  const tempContents = [...contents];
  const tempContent = tempContents.splice(target, 1)[0];
  tempContents.splice(moveTo, 0, tempContent);

  return tempContents;
};