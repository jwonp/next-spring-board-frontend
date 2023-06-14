import { useEffect, useRef } from "react";
import styles from "./WYSIWYG.module.scss";
import { useRouter } from "next/router";
import EditableBar from "./EditableBar";
import { keepFirstDiv, replaceBold, testEditable } from "./WYSIWYGfunc";
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
            onClick={() => {
              testEditable($editable, selection);
            }}>
            TEST
          </div>
        </div>
        <div className={`${styles.box}`}>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<strong>
              replaceBold($editable, selection);
            }}>
            굵게
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<em>
            }}>
            기울임
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<s>
            }}>
            취소선
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<a>
            }}>
            링크
          </div>
        </div>
        <div className={`${styles.box}`}>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<code>
            }}>
            코드
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<pre>
              //  <code></code>
              //</pre>
            }}>
            코드블럭
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<blockquote>
              //  :before
              //  <p></p>
              //  :after
              //</blockquote>
            }}>
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
            onClick={() => {
              //<h1>
            }}>
            H1
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<h2>
            }}>
            H2
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<h3>
            }}>
            H3
          </div>
        </div>
        <div className={`${styles.box}`}>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<ul>
            }}>
            글머리
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<ol>
            }}>
            번호 목록
          </div>
          <div
            className={`${styles.button}`}
            onClick={() => {
              //<hr>
            }}>
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
        <p>
          A B C D <strong>E F G</strong> H I
        </p>
        <p>
          A B C <em>D E</em> F G
        </p>
        <div>A B C D E F G</div>
      </div>
    </div>
  );
};

export default WYSIWYG;
