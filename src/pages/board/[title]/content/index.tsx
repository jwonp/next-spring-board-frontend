import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@src/styles/board/content/ContentEdit.module.scss";

import ContentEditBar from "@src/components/module/board/content/ContentEditBar";
import React from "react";
import ReactDOMClient from "react-dom/client";
import { ContentDataType } from "@src/static/types/ContentDataType";
import { v4 as uuidv4 } from "uuid";
const ContentEdit = () => {
  const router = useRouter();
  const $wrapper = useRef<HTMLDivElement>(null);
  const $contentContainer = useRef<HTMLDivElement>(null);
  const $mouse = useRef<HTMLDivElement>(null);
  const $addBtn = useRef<HTMLDivElement>(null);
  const $handleBtn = useRef<HTMLDivElement>(null);
  const $dragDiv = useRef<HTMLDivElement>(null);
  const $mouseOnTarget = useRef<number>(-1);
  const $scrollLocation = useRef<number>(0);
  const mouseOnTarget = useMemo(() => {
    return $mouseOnTarget.current;
  }, [$mouseOnTarget.current]);
  const [mousePoint, setMousePoint] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const $targetLocation = useRef<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const [refs, setRefs] = useState<ContentDataType[]>([{ content: "0" }]);

  const ContentEditBarList = useMemo(() => {
    return refs.map((value, index) => (
      <ContentEditBar
        key={index}
        str={value}
        index={index}
        target={$mouseOnTarget}
      />
    ));
  }, [refs.length]);

  const title = useMemo(() => {
    return router.query.title;
  }, [router.asPath]);

  useEffect(() => {
    if ($contentContainer.current === undefined) return;
    if ($mouseOnTarget.current === -1) {
      $addBtn.current.classList.toggle(styles.invisible, true);
      $handleBtn.current.classList.toggle(styles.invisible, true);
      return;
    }
    // console.log($contentContainer.current.children);
    // console.log($wrapper.current);
    $targetLocation.current = {
      x: (
        $contentContainer.current.children[
          $mouseOnTarget.current
        ] as HTMLDivElement
      ).offsetLeft,
      y: (
        $contentContainer.current.children[
          $mouseOnTarget.current
        ] as HTMLDivElement
      ).offsetTop,
    };
    // setMousePoint 지우면 + :: 안 뜨는 이유 찾기
    // const x =
    // const y =
    // console.log(`${$mouseOnTarget.current} is x : ${x} , y : ${y}`);
    const scroll = $scrollLocation.current;
    $addBtn.current.style.left = `${$targetLocation.current.x}px`;
    $addBtn.current.style.top = `${$targetLocation.current.y - scroll}px`;

    $handleBtn.current.style.left = `${$targetLocation.current.x + 15}px`;
    $handleBtn.current.style.top = `${$targetLocation.current.y - scroll}px`;
    $addBtn.current.classList.toggle(styles.invisible, false);
    $handleBtn.current.classList.toggle(styles.invisible, false);
  }, [$mouseOnTarget.current]);

  return (
    <div
      ref={$wrapper}
      className={`${styles.wrapper}`}
      onScroll={(e) => {
        $scrollLocation.current = e.currentTarget.scrollTop;
      }}>
      <div ref={$mouse} className={`${styles.mouse}`}>
        hh
      </div>
      <div className={`${styles.header_container}`}>
        <div className={`${styles.board_name}`}>{title}</div>
        <div className={`${styles.content_title}`}>
          <input type="text" />
        </div>
        <div className={`${styles.submit_btn}`}>
          <input type="submit" value={"저장"} />
        </div>
      </div>
      <div
        ref={$contentContainer}
        className={`${styles.content_container}`}
        onMouseMove={(e) => {
          const x = e.clientX;
          const y = e.clientY;
          // $mouse.current.style.left = x + 30 + "px";
          // $mouse.current.style.top = y + "px";

          setMousePoint({ x: x, y: y });
        }}>
        {ContentEditBarList}
      </div>
      <div
        className={`${styles.add_content_edit_bar_btn} `}
        onClick={(e) => {
          e.currentTarget.classList.toggle(styles.invisible, true);
        }}>
        add new content edit bar
      </div>
      <div
        ref={$addBtn}
        className={`${styles.add} ${styles.invisible}`}
        onClick={() => {
          const newContent = { content: "" };
          if (refs.length === 0) {
            setRefs([newContent]);
            return;
          }
          if (mouseOnTarget === refs.length - 1) {
            setRefs([...refs, newContent]);
            return;
          }
          const refsClone = Object.assign([], refs);
          refsClone.splice(mouseOnTarget, 0, newContent);
          setRefs(refsClone);
          // if ($mouseOnTarget.current < refs.length - 1) {
          //   const existedContentOnTarget = Object.assign(
          //     {},
          //     refs[$mouseOnTarget.current]
          //   );
          //   const refsClone = Object.assign([], refs);
          //   refsClone[refs.length - 1] = existedContentOnTarget;
          //   refsClone[$mouseOnTarget.current] = newContent;
          //   console.log(refsClone);
          //   setRefs(refsClone);
          // }
        }}>
        +
      </div>
      <div
        ref={$handleBtn}
        className={`${styles.handle} ${styles.invisible}`}
        onClick={() => {
          $dragDiv.current.appendChild(
            $contentContainer.current.children[
              $mouseOnTarget.current
            ] as HTMLDivElement
          );
          $dragDiv.current.classList.toggle(styles.invisible, false);
        }}>
        ::
      </div>
      <div ref={$dragDiv} className={`${styles.invisible}`}></div>
    </div>
  );
};

export default ContentEdit;
