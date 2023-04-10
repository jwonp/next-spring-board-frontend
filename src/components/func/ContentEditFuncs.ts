import ContentEditStyles from "@src/styles/board/content/ContentEdit.module.scss";
import TextBarStyles from "@src/styles/board/content/TextBar.module.scss";
import ContentEditBarStyles from "@src/styles/board/content/ContentEditBar.module.scss";
import {
  VariationFlag,
  VariationFlagType,
} from "@src/static/types/VariationFlagType";
import { LocationType } from "@src/static/types/LocationType";
import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import {
  ContentBarDataType,
  ContentTypeType,
} from "@src/static/types/ContentDataType";
import { SaveContentType } from "@src/static/types/SaveContentType";

import axios from "axios";
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
export const isMouseOnTarget = (
  mouseLocation: LocationType,
  containerSizes: ContainerSizeType,
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
  controlDiv.classList.toggle(ContentEditStyles.fadein, !bool);
  controlDiv.classList.toggle(ContentEditStyles.fadeout, bool);
  setTimeout(() => {
    controlDiv.classList.toggle(ContentEditStyles.invisible, bool);
  }, 100);
};

export const relocateControl = (
  targetLocation: LocationType,
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
  contents: ContentBarDataType[]
) => {
  if (target < 0 || moveTo < 0 || target === moveTo) return contents;
  const tempContents = [...contents];
  const tempContent = tempContents.splice(target, 1)[0];
  tempContents.splice(moveTo, 0, tempContent);

  return tempContents;
};

export const invisibleBorder = (target: HTMLDivElement) => {
  target.classList.toggle(TextBarStyles.content_hover, false);
  target.classList.toggle(ContentEditBarStyles.border_bottom, false);
  target.classList.toggle(ContentEditBarStyles.border_top, false);
};

export const createNewContent = (
  content: string = "",
  type: ContentTypeType = "text"
) => {
  const newContent: ContentBarDataType = {
    type: type,
    content: "",
    image: "",
  };
  if (newContent.type === ("text" as ContentTypeType)) {
    newContent.content = content;
  }

  if (newContent.type === ("image" as ContentTypeType)) {
    newContent.image = content;
  }

  return newContent;
};

export const saveContents = async (data: SaveContentType) => {
  await axios
    .post(`/api/board/edit`, data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
