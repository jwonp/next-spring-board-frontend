import { useEffect, useRef } from "react";
import styles from "./WYSIWYG.module.scss";
import { useRouter } from "next/router";
const WYSIWYG = () => {
  const router = useRouter();
  const $editable = useRef<HTMLDivElement>(null);
  const selection = useRef<Selection>();
  const range = useRef<Range>();
  useEffect(() => {
    if (router.isReady === false) return;
    selection.current = document.getSelection();
    range.current = document.createRange();
  }, [router.isReady]);
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.title}`}>WYSIWYG</div>
      <div className={`${styles.toolbar}`}>
        <div className={`${styles.box}`}>
          <div
            onClick={() => {
              console.log(selection.current);
              console.log($editable.current.children);
              console.log($editable.current.innerHTML);
            }}>
            TEST
          </div>
        </div>
        <div className={`${styles.box}`}>
          <div onClick={() => {}}>굵게</div>
          <div onClick={() => {}}>기울임</div>
          <div onClick={() => {}}>취소선</div>
          <div onClick={() => {}}>링크</div>
        </div>
        <div className={`${styles.box}`}>
          <div onClick={() => {}}>코드</div>
          <div onClick={() => {}}>코드블럭</div>
          <div onClick={() => {}}>인용구</div>
          <div onClick={() => {}}>그림</div>
        </div>
        <div className={`${styles.box}`}>
          <div onClick={() => {}}>H1</div>
          <div onClick={() => {}}>H2</div>
          <div onClick={() => {}}>H3</div>
        </div>
        <div>
          <div onClick={() => {}}>글머리</div>
          <div onClick={() => {}}>번호 목록</div>
          <div onClick={() => {}}>구분선</div>
        </div>
      </div>
      <div
        ref={$editable}
        contentEditable={true}
        suppressContentEditableWarning={true}>
        <p>hi</p>
      </div>
    </div>
  );
};

export default WYSIWYG;
