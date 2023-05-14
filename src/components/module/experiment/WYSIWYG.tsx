import { useEffect, useRef } from "react";
import styles from "./WYSIWYG.module.scss";
import { useRouter } from "next/router";
import EditableBar from "./EditableBar";
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
      console.log(selection.current.focusNode.parentElement.tagName);
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
              const focusNode = selection.current.focusNode.parentNode;
              const anchorNode = selection.current.anchorNode.parentNode;
              const childNodes = $editable.current.childNodes;
              const children = $editable.current.children;
              console.log(childNodes);
              childNodes.forEach((value, index) => {
                if (focusNode.isSameNode(value)) {
                  console.log(`focus node's index is ${index}`);
                  const child = children[index];
                  const _surplusString = child.textContent.substring(
                    0,
                    selection.current.focusOffset
                  );
                  const _targetString = child.textContent.substring(
                    selection.current.focusOffset
                  );

                  child.innerHTML = child.innerHTML.replace(
                    child.textContent,
                    `${_surplusString}<strong>${_targetString}<strong>`
                  );

                  return;
                }
                if (anchorNode.isSameNode(value)) {
                  console.log(`anchor node's index is ${index}`);
                  const child = children[index];
                  const _targetString = child.textContent.substring(
                    0,
                    selection.current.anchorOffset
                  );
                  const _surplusString = child.textContent.substring(
                    selection.current.anchorOffset
                  );

                  child.innerHTML = child.innerHTML.replace(
                    child.textContent,
                    `<strong>${_targetString}<strong>${_surplusString}`
                  );

                  return;
                }
                if (selection.current.containsNode(value)) {
                  console.log(`${index}'s node is contained in selection`);
                  const child = children[index];
                  const childNode = childNodes[index];
                  console.log(child.tagName);
                  child.innerHTML = child.innerHTML.replace(
                    child.textContent,
                    `<strong>${child.textContent}<strong>`
                  );
                }
                // console.log(index);
              });

              //   console.log($editable.current.innerHTML);
            }}>
            TEST
          </div>
        </div>
        <div className={`${styles.box}`}>
          <div
            className={`${styles.button}`}
            onClick={() => {}}>
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
        suppressContentEditableWarning={true}>
        <EditableBar>hi</EditableBar>
      </div>
    </div>
  );
};

export default WYSIWYG;
