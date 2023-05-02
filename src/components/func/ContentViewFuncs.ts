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
