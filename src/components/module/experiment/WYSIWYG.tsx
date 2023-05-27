import { useEffect, useRef } from "react";
import styles from "./WYSIWYG.module.scss";
import { useRouter } from "next/router";
import EditableBar from "./EditableBar";
import { keepFirstDiv, replaceBold } from "./WYSIWYGfunc";
const WYSIWYG = () => {
  const router = useRouter();
  const $editable = useRef<HTMLDivElement>(null);
  const selection = useRef<Selection>();
  const range = useRef<Range>();
  useEffect(() => {
    if (router.isReady === false) return;
    selection.current = document.getSelection();
    range.current = document.createRange();

    document.onselectionchange = () => {
      if (selection.current.isCollapsed) {
      }
      // console.log(selection.current.focusNode.parentElement.tagName);
    };
  }, [router.isReady]);
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.title}`}>WYSIWYG</div>
      <div className={`${styles.toolbar}`}>
        <div className={`${styles.box}`}>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            TEST
          </div>
        </div>
        <div className={`${styles.box}`}>
          <div
            className={`${styles.button}`}
            onClick={() => {
              replaceBold($editable, selection);
            }}>
            굵게
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            기울임
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            취소선
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            링크
          </div>
        </div>
        <div className={`${styles.box}`}>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            코드
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            코드블럭
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            인용구
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            그림
          </div>
        </div>
        <div className={`${styles.box}`}>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            H1
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            H2
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            H3
          </div>
        </div>
        <div className={`${styles.box}`}>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            글머리
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            번호 목록
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
            구분선
          </div>
        </div>
      </div>
      <div
        ref={$editable}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(e) => {
          keepFirstDiv(e, selection);
        }}>
        <EditableBar>hi</EditableBar>
      </div>
    </div>
  );
};

export default WYSIWYG;
