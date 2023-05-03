import pageIndex from "@src/redux/features/pageIndex";

export const getWindowWidth = (mainWrapper: HTMLElement) => {
  try {
    const paddingWidth =
      Number(
        window
          .getComputedStyle(mainWrapper, null)
          .getPropertyValue("padding")
          .split("px")[0]
      ) * 2;

    return mainWrapper.offsetWidth - paddingWidth;
  } catch {
    return;
  }
};
export const getPaginationIndex = (
  pageIndex: number,
  lastPointNumber: number
) => {
  return Math.floor(pageIndex / 10) * 10 + lastPointNumber;
};
