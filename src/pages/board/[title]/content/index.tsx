import styles from "@src/styles/board/content/ContentEdit.module.scss";

import {
  ContentBarDataType,
  ContentTypeType,
} from "@src/static/types/ContentDataType";
import { useEffect, useMemo, useRef, useState } from "react";

import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import {
  VariationFlag,
  VariationFlagType,
} from "@src/static/types/VariationFlagType";

import { LocationType } from "@src/static/types/LocationType";
import {
  createNewContent,
  getFocusTarget,
  isCaretOnFront,
  isContentEmpty,
  isFocusOnFirstEditBar,
  isOutOfContendEditBars,
  isVariationFlagDecrease,
  pointEndOfBeforeTheTarget,
  saveContents,
  setControlInvisible,
  swapElementsSequenceInContents,
} from "@src/components/func/ContentEditFuncs";
import { KeySet, sizes } from "@src/static/data/stringSet";
import AddTypeModel from "@src/components/module/board/content/AddTypeModal";
import { AddContentType } from "@src/static/types/AddContentsType";
import ContentEditBar from "@src/components/module/board/content/ContentEditBar";
import { SaveContentType } from "@src/static/types/SaveContentType";
import { useSession } from "next-auth/react";

const ContentEdit = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const $wrapper = useRef<HTMLDivElement>(null);
  const $contentContainer = useRef<HTMLDivElement>(null);
  const $title = useRef<HTMLInputElement>(null);
  const $contentWrapper = useRef<HTMLDivElement>(null);
  const $draggedTarget = useRef<HTMLDivElement>(null);
  const $control = useRef<HTMLDivElement>(null);
  const $addBtn = useRef<HTMLDivElement>(null);
  const $handleBtn = useRef<HTMLDivElement>(null);
  const $selection = useRef<Selection>(null);
  const $range = useRef<Range>(null);
  const $scrollLocation = useRef<number>(0);
  const $mouseOnIndex = useRef<number>(-1);
  const $focusIndex = useRef<number>(-1);
  const $moveToIndex = useRef<number>(-1);
  const $onDragIndex = useRef<number>(-1);
  const $targetDivBefore = useRef<HTMLDivElement>(null);
  const $caretLocation = useRef<number>(0);
  const $variationFlag = useRef<VariationFlagType>(VariationFlag.default);
  const $mouseLocation = useRef<LocationType>({ x: 0, y: 0 });
  const $lastIndex = useRef<number>(0);
  const [addType, setAddType] = useState<string>("text");
  const [isOpenAddTypeModal, setIsOpenAddTypeModal] = useState<boolean>(false);
  const [AddTypeModalLocation, setAddTypeModalLocation] =
    useState<LocationType>({ x: 0, y: 0 });
  const [contents, setContents] = useState<ContentBarDataType[]>([
    { type: "text", content: "", image: "" },
    // { type: "image", content: "", image: "/favicon.png" },
    { type: "text", content: "", image: "" },
  ]);

  const ContentEditBarList = useMemo(() => {
    $lastIndex.current = contents.length - 1;
    return contents.map((value, index) => (
      <ContentEditBar
        key={index}
        type={value.type}
        index={index}
        focus={$focusIndex}
        mouseOnIndex={$mouseOnIndex}
        mouseLocation={$mouseLocation}
        scroll={$scrollLocation}
        control={$control}
        onDragIndex={$onDragIndex}
        moveToIndex={$moveToIndex}
        contents={contents}
        setContents={setContents}
      />
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents]);

  const title = useMemo(() => {
    return router.query.title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useEffect(() => {
    if (router.isReady === false) return;
    _initSelection();
  }, [router.isReady]);

  useEffect(() => {
    _handleEventOnContentEditBarList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ContentEditBarList.length]);

  const _initSelection = () => {
    $selection.current = document.getSelection();
    $range.current = document.createRange();
  };
  const _handleEventOnContentEditBarList = () => {
    if ($variationFlag.current === VariationFlag.default) {
      return;
    }
    let _focusTarget = getFocusTarget(
      $focusIndex.current,
      $variationFlag.current,
      contents.length
    );

    const targetDiv = _getTargetFirstChildDivByIndex(_focusTarget);
    targetDiv.click();
    if (isVariationFlagDecrease($variationFlag.current)) {
      pointEndOfBeforeTheTarget(
        $targetDivBefore.current?.firstChild,
        $range.current,
        $selection.current,
        $caretLocation.current
      );
    }
    $variationFlag.current = VariationFlag.default;
  };

  const _getTargetDivByIndex = (index: number) => {
    return $contentContainer.current.children[index] as HTMLDivElement;
  };

  const _getTargetFirstChildDivByIndex = (index: number) => {
    return $contentContainer.current.children[index]
      .firstChild as HTMLDivElement;
  };

  /**
   *
   * @param target target 다음에 EditBar를 추가함
   * @param content EditBar에 들어갈 내용, image의 경우 src
   * @param type "text" | "image"
   * @returns
   */
  const addContent: AddContentType = (
    target: number,
    content: string = "",
    type: ContentTypeType = "text"
  ) => {
    const newContent = createNewContent(content, type);
    if (contents.length === 0) {
      setContents([newContent]);
      return;
    }
    if (target === contents.length - 1) {
      setContents([...contents, newContent]);
      return;
    }

    const contentsClone = Object.assign([], contents) as ContentBarDataType[];
    contentsClone.splice(target + 1, 0, newContent);

    setContents(contentsClone);
  };

  const handleWrapperScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    setControlInvisible($control.current, true);
    $scrollLocation.current = e.currentTarget.scrollTop;
  };

  const handleAddBtn = () => {
    const _targetWrapper = _getTargetDivByIndex($mouseOnIndex.current);
    const _targetChild = _getTargetFirstChildDivByIndex($mouseOnIndex.current);

    const _top = _targetWrapper.offsetTop + _targetWrapper.offsetHeight;
    const _left = _targetWrapper.offsetLeft + _targetChild.offsetLeft;
    const _location: LocationType = { x: _left, y: _top };

    setAddTypeModalLocation(_location);
    setIsOpenAddTypeModal(true);
  };

  const handleHandleBtnMouseDown = () => {
    $onDragIndex.current = $mouseOnIndex.current;
    $draggedTarget.current.innerHTML = contents[$mouseOnIndex.current].content;
    $draggedTarget.current.classList.toggle(styles.invisible, false);
  };

  const handleHandleBtnMouseUp = () => {
    $draggedTarget.current.innerText = "";
    $draggedTarget.current.classList.toggle(styles.invisible, true);

    if ($onDragIndex.current < 0) return;

    const tempContents = swapElementsSequenceInContents(
      $onDragIndex.current,
      $moveToIndex.current,
      [...contents]
    );
    setContents(tempContents);

    $onDragIndex.current = -1;
  };

  const handleContentContainerMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    $mouseLocation.current = { x: e.clientX, y: e.clientY };

    if (
      isOutOfContendEditBars(
        $contentContainer.current,
        $mouseLocation.current,
        $scrollLocation.current
      )
    ) {
      setControlInvisible($control.current, true);
    }

    if ($draggedTarget.current.classList.contains(styles.invisible)) return;
    $draggedTarget.current.style.left = $mouseLocation.current.x + 60 + "px";
    $draggedTarget.current.style.top = $mouseLocation.current.y + "px";
  };

  const handleContentContainerKeyUp = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === KeySet.ArrowUp) {
      if ($focusIndex.current <= 0) {
        return;
      }
      let _focusTarget = $focusIndex.current - 1;
      const targetDiv = _getTargetFirstChildDivByIndex(_focusTarget);

      const len = targetDiv.innerText.length;
      const offset = len > 0 ? 1 : 0;

      $selection.current.collapse(targetDiv, offset);
      return;
    }
    if (e.key === KeySet.ArrowDown) {
      if ($focusIndex.current >= contents.length - 1) {
        return;
      }
      let _focusTarget = $focusIndex.current + 1;
      const targetDiv = _getTargetFirstChildDivByIndex(_focusTarget);

      const len = targetDiv.innerText.length;
      const offset = len > 0 ? 1 : 0;

      $selection.current.collapse(targetDiv, offset);
      return;
    }
    if (e.key === KeySet.Enter) {
      const targetDiv = _getTargetFirstChildDivByIndex($focusIndex.current);

      const anchorOffset = $selection.current.anchorOffset;

      let sub: string = "";
      if ($selection.current.isCollapsed) {
        sub = targetDiv.innerText.substring(anchorOffset);
      }
      contents[$focusIndex.current].content = targetDiv.innerText.substring(
        0,
        anchorOffset
      );
      addContent($focusIndex.current, sub);
      $variationFlag.current = VariationFlag.increase;

      setControlInvisible($control.current, true);
    }
  };

  const handleContentContainerKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    const anchorOffset = $selection.current.anchorOffset;
    const focusOffset = $selection.current.focusOffset;
    if (
      ((isCaretOnFront(anchorOffset, focusOffset) &&
        isFocusOnFirstEditBar($focusIndex.current)) ||
        isContentEmpty(contents.length, contents[0].content)) &&
      e.key === KeySet.Backspace
    ) {
      e.preventDefault();
      return;
    }
    if (e.key === KeySet.ArrowUp || e.key === KeySet.Enter) {
      e.preventDefault();
    }

    if (
      e.key === KeySet.Backspace &&
      isCaretOnFront(anchorOffset, focusOffset)
    ) {
      e.preventDefault();
      $targetDivBefore.current = _getTargetFirstChildDivByIndex(
        $focusIndex.current - 1
      );
      $caretLocation.current = $targetDivBefore.current.innerText.length;

      const targetDiv = _getTargetFirstChildDivByIndex($focusIndex.current);

      if (
        $selection.current.isCollapsed &&
        isFocusOnFirstEditBar(focusOffset)
      ) {
        const contentToMerged = targetDiv.innerText;
        const originIndex = $focusIndex.current - 1;
        setContents(_getMergedContents(contents, originIndex, contentToMerged));

        $variationFlag.current = VariationFlag.decrease;
      }

      setControlInvisible($control.current, true);
    }
  };
  const _getMergedContents = (
    contents: ContentBarDataType[],
    originIndex: number,
    contentToMerged: string
  ) => {
    const originContent = contents[originIndex].content;
    const targetIndex = originIndex + 1;
    return contents
      .map((value, index) => {
        if (index === originIndex) {
          value.content = `${originContent}${contentToMerged}`;
        }
        if (index !== targetIndex) {
          return value;
        }
      })
      .filter((value, index) => index !== targetIndex);
  };
  const handleClickSubmit = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(session.user);
    const data: SaveContentType = {
      title: $title.current.value,
      contents: contents,
    };
    saveContents(data);
  };

  return (
    <div
      ref={$wrapper}
      className={`${styles.wrapper}`}
      onScroll={handleWrapperScroll}
      onMouseUp={handleHandleBtnMouseUp}>
      <div className={`${styles.header_container}`}>
        <div className={`${styles.board_name}`}>{title}</div>
        <div className={`${styles.title_box}`}>
          <div className={`${styles.content_title}`}>
            <input
              ref={$title}
              type="text"
              placeholder="제목을 입력해주세요."
            />
          </div>
          <div className={`${styles.submit_btn}`}>
            <input type="submit" value={"저장"} onClick={handleClickSubmit} />
          </div>
        </div>
      </div>

      <div
        ref={$contentWrapper}
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
              sizes={sizes}
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
              sizes={sizes}
              draggable={false}
            />
          </div>
        </div>
      </div>
      <AddTypeModel
        isOpen={isOpenAddTypeModal}
        mouseOnIndex={$mouseOnIndex.current}
        location={AddTypeModalLocation}
        setIsOpen={setIsOpenAddTypeModal}
        setAddType={setAddType}
        addContent={addContent}
      />
      <div
        ref={$draggedTarget}
        className={`${styles.mouse} ${styles.invisible}`}></div>
    </div>
  );
};

export default ContentEdit;
