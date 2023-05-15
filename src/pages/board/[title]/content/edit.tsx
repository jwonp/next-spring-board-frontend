import styles from "@src/styles/board/content/edit/ContentEdit.module.scss";
import {
  ContentBarAddType,
  ContentBarDataType,
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
  getFocusTarget,
  isCaretOnFront,
  isContentEmpty,
  isFocusOnFirstEditBar,
  isOutOfContendEditBars,
  isVariationFlagDecrease,
  pointEndOfBeforeTheTarget,
  relocateDraggedTarget,
  setControlInvisible,
  swapElementsSequenceInContents,
} from "@src/components/func/ContentEditFuncs";
import { KeySet, sizes } from "@src/static/data/stringSet";
import AddTypeModel from "@src/components/module/board/content/edit/AddTypeModal";
import ContentEditBar from "@src/components/module/board/content/edit/ContentEditBar";
import { SaveContentType } from "@src/static/types/SaveContentType";
import { useSession } from "next-auth/react";
import {
  confirmImages,
  modifyContents,
  saveContents,
} from "@src/components/func/requestFuncs";
import { BoardMenuType } from "@src/static/types/BoardMenuType";
import qs from "qs";
import {
  ModifyContentRequestType,
  ModifyContentType,
} from "@src/static/types/ModifyContentType";
import ImageHandler from "@src/components/module/board/content/edit/ImageHandler";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import {
  ModifyDataType,
  getContents,
  modifyContentByIndex,
  setContents,
  addNewContent,
  resetContent,
  getImages,
} from "@src/redux/features/content";

const ContentEdit = ({
  preTitle,
  preContents,
  contentId,
}: ModifyContentType) => {
  const { data: session } = useSession();
  const router = useRouter();

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
  const [isOpenAddTypeModal, setIsOpenAddTypeModal] = useState<boolean>(false);
  const [AddTypeModalLocation, setAddTypeModalLocation] =
    useState<LocationType>({ x: 0, y: 0 });
  const contents = useAppSelector(getContents);
  const images = useAppSelector(getImages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetContent());
    if (preTitle) {
      $title.current.value = preTitle;
    }
    if (preContents) {
      dispatch(setContents(preContents));
    }
  }, []);

  const ContentEditBarList = useMemo(() => {
    console.log("changed");
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
      />
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents]);

  const board = useMemo(() => {
    return router.query.title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useEffect(() => {
    if (router.isReady === false) return;
    initSelection();
  }, [router.isReady]);

  useEffect(() => {
    handleEventOnContentEditBarList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ContentEditBarList.length]);

  const initSelection = () => {
    $selection.current = document.getSelection();
    $range.current = document.createRange();
  };
  const handleEventOnContentEditBarList = () => {
    if ($variationFlag.current === VariationFlag.default) {
      return;
    }

    let _focusTarget = getFocusTarget(
      $focusIndex.current,
      $variationFlag.current,
      contents.length
    );
    if (_focusTarget === -1) return;
    const targetDiv = getTargetFirstChildDivByIndex(_focusTarget);
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

  const getTargetDivByIndex = (index: number) => {
    return $contentContainer.current.children[index] as HTMLDivElement;
  };

  const getTargetFirstChildDivByIndex = (index: number) => {
    return $contentContainer.current.children[index]
      .firstChild as HTMLDivElement;
  };

  const getMergedContents = (
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
      .filter((_, index) => index !== targetIndex);
  };

  const handleWrapperScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    setControlInvisible($control.current, true);
    $scrollLocation.current = e.currentTarget.scrollTop;
  };

  const handleAddBtn = () => {
    const _targetWrapper = getTargetDivByIndex($mouseOnIndex.current);
    const _targetChild = getTargetFirstChildDivByIndex($mouseOnIndex.current);

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
    dispatch(setContents(tempContents));

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

    relocateDraggedTarget($draggedTarget.current, $mouseLocation.current);
  };

  const handleContentContainerKeyUp = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === KeySet.ArrowUp) {
      if ($focusIndex.current <= 0) {
        return;
      }
      let _focusTarget = $focusIndex.current - 1;
      const targetDiv = getTargetFirstChildDivByIndex(_focusTarget);

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
      const targetDiv = getTargetFirstChildDivByIndex(_focusTarget);

      const len = targetDiv.innerText.length;
      const offset = len > 0 ? 1 : 0;

      $selection.current.collapse(targetDiv, offset);
      return;
    }
    if (e.key === KeySet.Enter) {
      const targetDiv = getTargetFirstChildDivByIndex($focusIndex.current);
      const anchorOffset = $selection.current.anchorOffset;

      let textBefore: string = "";
      let textAfter: string = "";
      if ($selection.current.isCollapsed) {
        textBefore = targetDiv.innerText.substring(0, anchorOffset);
        textAfter = targetDiv.innerText.substring(anchorOffset);
      }
      const modifyData: ModifyDataType = {
        index: $focusIndex.current,
        content: textBefore,
      };
      dispatch(modifyContentByIndex(modifyData));

      const newContentData: ContentBarAddType = {
        target: $focusIndex.current,
        content: textAfter,
        type: "text",
      };
      dispatch(addNewContent(newContentData));
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
      $targetDivBefore.current = getTargetFirstChildDivByIndex(
        $focusIndex.current - 1
      );
      $caretLocation.current = $targetDivBefore.current.innerText.length;

      const targetDiv = getTargetFirstChildDivByIndex($focusIndex.current);

      if (
        $selection.current.isCollapsed &&
        isFocusOnFirstEditBar(focusOffset)
      ) {
        const contentToMerged = targetDiv.innerText;
        const originIndex = $focusIndex.current - 1;
        dispatch(
          setContents(getMergedContents(contents, originIndex, contentToMerged))
        );

        $variationFlag.current = VariationFlag.decrease;
      }

      setControlInvisible($control.current, true);
    }
  };

  const handleClickSubmit = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (contentId) {
      const data: ModifyContentRequestType = {
        contentId: contentId,
        title: $title.current.value,
        contents: qs.stringify(contents),
        writer: session.user.id,
      };
      modifyContents(data).then((res) => {
        confirmImages(res.data, images, session.user.id);
      });
    } else {
      const data: SaveContentType = {
        title: $title.current.value,
        contents: qs.stringify(contents),
        writer: session.user.id,
        board: board as BoardMenuType,
      };
      saveContents(data).then((res) => {
        confirmImages(res.data, images, session.user.id);
      });
    }

    router.push(`/board/${board}`);
  };

  return (
    <div
      className={`${styles.wrapper}`}
      onScroll={handleWrapperScroll}
      onMouseUp={handleHandleBtnMouseUp}>
      <div className={`${styles.header_container}`}>
        <div className={`${styles.board_name}`}>{board}</div>
        <div className={`${styles.title_box}`}>
          <div className={`${styles.content_title}`}>
            <input
              id="content-title"
              ref={$title}
              type="text"
              placeholder="제목을 입력해주세요."
            />
          </div>
          <div className={`${styles.submit_btn}`}>
            <input
              type="submit"
              value={"저장"}
              onClick={handleClickSubmit}
            />
          </div>
        </div>
      </div>

      <div
        id="content-wrapper"
        ref={$contentWrapper}
        className={`${styles.content_container} `}
        onMouseMove={handleContentContainerMouseMove}>
        <div
          id="content-container"
          ref={$contentContainer}
          onKeyUp={handleContentContainerKeyUp}
          onKeyDown={handleContentContainerKeyDown}>
          {ContentEditBarList}
        </div>
      </div>

      <div
        id="control"
        ref={$control}
        className={`${styles.control} ${styles.invisible}`}>
        <div
          id="add-btn"
          ref={$addBtn}
          className={`${styles.add}`}
          onClick={handleAddBtn}>
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
          id="handle-btn"
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
      />
      <ImageHandler />
      <div
        id="dragged-target"
        ref={$draggedTarget}
        className={`${styles.mouse} ${styles.invisible}`}></div>
    </div>
  );
};

export default ContentEdit;
