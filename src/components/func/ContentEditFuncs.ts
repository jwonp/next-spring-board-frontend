import ContentEditStyles from "@src/styles/board/content/edit/ContentEdit.module.scss";
import TextBarStyles from "@src/styles/board/content/edit/TextBar.module.scss";
import ContentEditBarStyles from "@src/styles/board/content/edit/ContentEditBar.module.scss";
import {
  VariationFlags,
  VariationFlag,
} from "@src/static/types/VariationFlagType";
import { Location } from "@src/static/types/LocationType";
import { ContainerSize } from "@src/static/types/ContainerSizeType";
import { ContentBarData, ContentType } from "@src/static/types/ContentDataType";
import { MouseLocationCheck } from "@src/static/types/MouseLocationCheckType";
import { __Zero } from "@src/static/numbers/numberSet";
import { __One } from "@src/static/numbers/numberSet";

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

export const isVariationFlagDecrease = (variationFlag: VariationFlag) => {
  return variationFlag === VariationFlags.decrease;
};

/**
 * contents의 길이가 바뀌면서 증가/감소 했는지
 * variationFlag로 확인해서 그에 맞게 focusTarget을 변경하는데,
 * contentsLength를 벗어나지 않게 변경한 focusTargetIndex를 반환
 * @param focusTargetIndex 변경 전 focusTargetIndex
 * @param variationFlag contents의 요소가 증가했으면 +1, 감소했으면 -1, 그대로면 0
 * @param contentsLength 현재 contents 배열의 길이
 * @returns 0 < focusTarget < contentsLength 임을 보장하는 focusTarget 값을 반환
 */
export const getFocusTarget = (
  focusTargetIndex: number,
  variationFlag: VariationFlag,
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
export const isMouseOnTarget = (
  mouseLocation: Location,
  containerSizes: ContainerSize,
  scroll: number
) => {
  if (!mouseLocation || !containerSizes) {
    return false;
  }

  return (
    isLoactionXOnTarget(
      mouseLocation.x,
      containerSizes.left,
      containerSizes.width
    ) &&
    isLoactionYOnTarget(
      mouseLocation.y,
      containerSizes.top,
      containerSizes.height,
      scroll
    )
  );
};
export const isLoactionYOnBottomOfTarget = ({
  mouseY,
  wrapperTop,
  wrapperHeight,
  scroll,
}: MouseLocationCheck) => {
  return (
    wrapperTop + wrapperHeight / 2 - scroll < mouseY &&
    mouseY < wrapperTop + wrapperHeight - scroll
  );
};

export const isLoactionYOnTopOfTarget = ({
  mouseY,
  wrapperTop,
  wrapperHeight,
  scroll,
}: MouseLocationCheck) => {
  return (
    wrapperTop - scroll < mouseY &&
    mouseY < wrapperTop + wrapperHeight / 2 - scroll
  );
};

export const isOutOfContendEditBars = (
  container: HTMLDivElement,
  mouseLocation: Location,
  scroll: number
) => {
  const sizes: ContainerSize = {
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
  controlDiv.classList.toggle(ContentEditStyles.fadein, !bool);
  controlDiv.classList.toggle(ContentEditStyles.fadeout, bool);
  setTimeout(() => {
    controlDiv.classList.toggle(ContentEditStyles.invisible, bool);
  }, 100);
};

export const relocateControl = (
  targetLocation: Location,
  controlDiv: HTMLDivElement,
  onDragIndex: number
) => {
  if (onDragIndex > -1) return;

  controlDiv.style.left = `${targetLocation.x}px`;
  controlDiv.style.top = `${targetLocation.y}px`;

  setControlInvisible(controlDiv, false);
};

export const swapElementsSequenceInContents = (
  target: number,
  moveTo: number,
  contents: ContentBarData[]
) => {
  if (target < __Zero || moveTo < __Zero || target === moveTo) return contents;
  const tempContents = [...contents];
  const tempContent = tempContents.splice(target, __One)[__Zero];
  tempContents.splice(moveTo, __Zero, tempContent);

  return tempContents;
};

export const invisibleBorder = (target: HTMLDivElement) => {
  target.classList.toggle(TextBarStyles.content_hover, false);
  target.classList.toggle(ContentEditBarStyles.border_bottom, false);
  target.classList.toggle(ContentEditBarStyles.border_top, false);
};

export const createNewContent = (
  content: string = "",
  type: ContentType = "text"
) => {
  const newContent: ContentBarData = {
    type: type,
    text: "",
    image: "",
  };
  if (newContent.type === ("text" as ContentType)) {
    newContent.text = content;
  }

  if (newContent.type === ("image" as ContentType)) {
    newContent.image = content;
  }

  return newContent;
};

export const relocateDraggedTarget = (
  draggedTarget: HTMLDivElement,
  mouseLocation: Location
) => {
  if (draggedTarget.classList.contains(ContentEditStyles.invisible)) return;
  draggedTarget.style.left = mouseLocation.x + 60 + "px";
  draggedTarget.style.top = mouseLocation.y + "px";
  draggedTarget;
};

export const displayBorderOnTarget = (
  wrapperDiv: HTMLDivElement,
  dragIndex: number,
  targetIndex: number,
  locations: MouseLocationCheck
) => {
  const isMouseOnTargetBefore =
    dragIndex >= targetIndex && isLoactionYOnTopOfTarget(locations);
  const isMouseOnTargetAfter =
    dragIndex >= 0 &&
    dragIndex < targetIndex &&
    isLoactionYOnBottomOfTarget(locations);
  if (isMouseOnTargetBefore) {
    wrapperDiv.firstElementChild.classList.toggle(
      ContentEditBarStyles.border_top,
      true
    );
  }
  if (isMouseOnTargetAfter) {
    wrapperDiv.firstElementChild.classList.toggle(
      ContentEditBarStyles.border_bottom,
      true
    );
  }
};
