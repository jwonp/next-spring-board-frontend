import styles from "@src/styles/board/content/ContentEdit.module.scss";
import ContentEditBar from "@src/components/module/board/content/ContentEditBar";
import { ContentDataType } from "@src/static/types/ContentDataType";

import { useEffect, useMemo, useRef, useState } from "react";
import qs from "qs";
import { useRouter } from "next/router";

import React from "react";
import Image from "next/image";

import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import { debounce } from "lodash";
import { VariationFlag } from "@src/static/types/VariationFlagType";

const ContentEdit = () => {
  const router = useRouter();
  const $wrapper = useRef<HTMLDivElement>(null);
  const $contentContainer = useRef<HTMLDivElement>(null);
  const $contentContainerSize = useRef<ContainerSizeType>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const $title = useRef<HTMLInputElement>(null);
  const $draggedTarget = useRef<HTMLDivElement>(null);
  const $control = useRef<HTMLDivElement>(null);
  const $addBtn = useRef<HTMLDivElement>(null);
  const $handleBtn = useRef<HTMLDivElement>(null);
  const $selection = useRef<Selection>(null);
  const $range = useRef<Range>(null);
  const $scrollLocation = useRef<number>(0);
  const $mouseOnTarget = useRef<number>(-1);
  const $focusTarget = useRef<number>(-1);
  const $isOnDrag = useRef<boolean>(false);
  const $targetDivBefore = useRef<HTMLDivElement>(null);
  const $caretLocation = useRef<number>(0);
  const $variationFlag = useRef<number>(VariationFlag.default);
  const $mouseLocation = useRef<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const $targetLocation = useRef<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [contents, setContents] = useState<ContentDataType[]>([
    { content: "" },
  ]);

  const ContentEditBarList = useMemo(() => {
    return contents.map((value, index) => (
      <ContentEditBar
        key={index}
        str={value}
        index={index}
        focus={$focusTarget}
        // $isDragging
      />
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents.length]);

  const title = useMemo(() => {
    return router.query.title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useEffect(() => {
    const sizes: ContainerSizeType = {
      left: $contentContainer.current.offsetLeft,
      top: $contentContainer.current.offsetTop,
      width: $contentContainer.current.offsetWidth,
      height: $contentContainer.current.offsetHeight,
    };
    $contentContainerSize.current = sizes;
  }, []);
  useEffect(() => {
    if (router.isReady === false) return;
    $selection.current = document.getSelection();
    $range.current = document.createRange();
  }, [router.isReady]);

  useEffect(() => {
    if ($variationFlag.current === VariationFlag.default) {
      return;
    }
    let _focusTarget = $focusTarget.current + $variationFlag.current;
    if (_focusTarget >= contents.length) {
      _focusTarget = contents.length - 1;
    }
    if (_focusTarget < 0) {
      _focusTarget = 0;
    }
    const targetDiv = getTargetDivByIndex(_focusTarget);
    targetDiv.click();
    if ($variationFlag.current === VariationFlag.decrease) {
      $range.current.setStart(
        $targetDivBefore.current.firstChild,
        $caretLocation.current
      );
      $range.current.collapse(true);
      $selection.current.removeAllRanges();
      $selection.current.addRange($range.current);
    }
    $variationFlag.current = VariationFlag.default;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ContentEditBarList.length]);
  const isCaretOnFront = () => {
    return (
      $selection.current.anchorOffset === $selection.current.focusOffset &&
      $selection.current.focusOffset === 0
    );
  };
  const isFocusOnFirstEditBar = () => {
    return $focusTarget.current === 0;
  };
  const isContentEmpty = () => {
    return contents.length === 1 && contents[0].content === "";
  };
  const setControlInvisible = (bool: boolean) => {
    $control.current.classList.toggle(styles.fadein, !bool);
    $control.current.classList.toggle(styles.fadeout, bool);
    setTimeout(() => {
      $control.current.classList.toggle(styles.invisible, bool);
    }, 100);
  };
  const getTargetDivByIndex = (index: number) => {
    return $contentContainer.current.children[index]
      .firstChild as HTMLDivElement;
  };
  const getEditBarByLocation = (x: number, y: number): number => {
    const sizes = $contentContainerSize.current;
    const scroll = $scrollLocation.current;
    if (x < sizes.left || x > sizes.left + sizes.width) {
      return -1;
    }
    if (y < sizes.top - scroll || y > sizes.top + sizes.height - scroll) {
      return -1;
    }

    const ContentEditBarHeight = sizes.height / contents.length;
    const target = Math.floor((y + scroll - sizes.top) / ContentEditBarHeight);

    if (target >= contents.length) {
      return contents.length - 1;
    }
    return target;
  };

  const relocateControl = () => {
    if ($isOnDrag.current === true) return;
    const targetDiv = getTargetDivByIndex($mouseOnTarget.current);

    $targetLocation.current = {
      x: targetDiv.offsetLeft,
      y: targetDiv.offsetTop,
    };

    const scroll = $scrollLocation.current;
    $control.current.style.left = `${$targetLocation.current.x - 45}px`;
    $control.current.style.top = `${$targetLocation.current.y - scroll}px`;

    setControlInvisible(false);
  };

  const addContent = (target: number, content: string = "") => {
    const newContent = { content: content };
    if (contents.length === 0) {
      setContents([newContent]);
      return;
    }
    if (target === contents.length - 1) {
      setContents([...contents, newContent]);
      return;
    }

    const contentsClone = Object.assign([], contents) as ContentDataType[];
    contentsClone.splice(target + 1, 0, newContent);

    setContents(contentsClone);
  };

  const handleWrapperScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    setControlInvisible(true);
    $scrollLocation.current = e.currentTarget.scrollTop;
  };

  const handleAddBtn = () => {
    addContent($mouseOnTarget.current);
  };

  const handleHandleBtnMouseDown = () => {
    $isOnDrag.current = true;
    $draggedTarget.current.innerText = contents[$mouseOnTarget.current].content;
    $draggedTarget.current.classList.toggle(styles.invisible, false);
  };

  const handleHandleBtnMouseUp = () => {
    $isOnDrag.current = false;
    $draggedTarget.current.innerText = "";
    $draggedTarget.current.classList.toggle(styles.invisible, true);
  };

  const handleContentContainerMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    $mouseLocation.current = { x: e.clientX, y: e.clientY };

    $contentContainerSize.current = {
      left: $contentContainer.current.offsetLeft,
      top: $contentContainer.current.offsetTop,
      width: $contentContainer.current.offsetWidth,
      height: $contentContainer.current.offsetHeight,
    };

    $mouseOnTarget.current = getEditBarByLocation(
      $mouseLocation.current.x,
      $mouseLocation.current.y
    );

    if ($mouseOnTarget.current === -1) {
      setControlInvisible(true);
      return;
    }
    relocateControl();
    $draggedTarget.current.style.left = $mouseLocation.current.x + 60 + "px";
    $draggedTarget.current.style.top = $mouseLocation.current.y + "px";
  };

  const handleContentContainerKeyUp = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "ArrowUp") {
      if ($focusTarget.current <= 0) {
        return;
      }
      let _focusTarget = $focusTarget.current - 1;
      const targetDiv = getTargetDivByIndex(_focusTarget);

      const len = targetDiv.innerText.length;
      const offset = len > 0 ? 1 : 0;

      $selection.current.collapse(targetDiv, offset);
      return;
    }
    if (e.key === "ArrowDown") {
      if ($focusTarget.current >= contents.length - 1) {
        return;
      }
      let _focusTarget = $focusTarget.current + 1;
      const targetDiv = getTargetDivByIndex(_focusTarget);

      const len = targetDiv.innerText.length;
      const offset = len > 0 ? 1 : 0;

      $selection.current.collapse(targetDiv, offset);
      return;
    }
    if (e.key === "Enter") {
      const targetDiv = getTargetDivByIndex($focusTarget.current);

      const anchorOffset = $selection.current.anchorOffset;
      const focusOffset = $selection.current.focusOffset;
      let sub: string = "";
      if ($selection.current.isCollapsed) {
        sub = targetDiv.innerText.substring(anchorOffset);
      }
      contents[$focusTarget.current].content = targetDiv.innerText.substring(
        0,
        anchorOffset
      );
      addContent($focusTarget.current, sub);
      $variationFlag.current = VariationFlag.increase;

      setControlInvisible(true);
    }
  };

  const handleContentContainerKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    const anchorOffset = $selection.current.anchorOffset;
    const focusOffset = $selection.current.focusOffset;
    if (
      ((isCaretOnFront() && isFocusOnFirstEditBar()) || isContentEmpty()) &&
      e.key === "Backspace"
    ) {
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowUp" || e.key === "Enter") {
      e.preventDefault();
    }

    if (e.key === "Backspace" && isCaretOnFront()) {
      e.preventDefault();
      $targetDivBefore.current = getTargetDivByIndex($focusTarget.current - 1);
      $caretLocation.current = $targetDivBefore.current.innerText.length;

      const targetDiv = getTargetDivByIndex($focusTarget.current);

      if ($selection.current.isCollapsed && focusOffset === 0) {
        const contentToMerged = targetDiv.innerText;
        const originContent = contents[$focusTarget.current - 1].content;
        contents.map((value, index) => {
          if (index === $focusTarget.current - 1) {
            value.content = `${originContent}${contentToMerged}`;
          }
          if (index !== $focusTarget.current) {
            return value;
          }
        });
        setContents(
          contents.filter((value, index) => index !== $focusTarget.current)
        );

        $variationFlag.current = VariationFlag.decrease;
      }

      setControlInvisible(true);
    }
  };

  const handleClickSubmit = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();

    const data = {
      title: $title.current.value,
      contents: contents,
    };
    const stringifyContents = qs.stringify(contents);
    const parseContents = qs.parse(stringifyContents);

    console.log(stringifyContents);
    console.log(parseContents);
  };

  return (
    <div
      ref={$wrapper}
      className={`${styles.wrapper}`}
      onScroll={handleWrapperScroll}
      onMouseUp={handleHandleBtnMouseUp}>
      <div className={`${styles.header_container}`}>
        <div className={`${styles.board_name}`}>{title}</div>
        <div className={`${styles.content_title}`}>
          <input ref={$title} type="text" />
        </div>
        <div className={`${styles.submit_btn}`}>
          <input type="submit" value={"저장"} onClick={handleClickSubmit} />
        </div>
      </div>
      <div
        className={`${styles.content_container} `}
        onMouseMove={handleContentContainerMouseMove}>
        <div
          ref={$contentContainer}
          onKeyUp={handleContentContainerKeyUp}
          onKeyDown={handleContentContainerKeyDown}>
          {ContentEditBarList}
        </div>
      </div>

      <div ref={$control} className={`${styles.control} ${styles.invisible}`}>
        <div ref={$addBtn} className={`${styles.add}`} onClick={handleAddBtn}>
          <div>
            <Image
              src={"/plus.svg"}
              alt={"No plus"}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              draggable={false}
            />
          </div>
        </div>
        <div
          ref={$handleBtn}
          className={`${styles.handle}`}
          onMouseDown={handleHandleBtnMouseDown}>
          <div>
            <Image
              src={"/dots.svg"}
              alt={"No dots"}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              draggable={false}
            />
          </div>
        </div>
      </div>
      <div
        ref={$draggedTarget}
        className={`${styles.mouse} ${styles.invisible}`}></div>
    </div>
  );
};

export default ContentEdit;
