import { MutableRefObject } from "react";
export const keepFirstDiv = (
  e: React.FormEvent<HTMLDivElement>,
  selection: MutableRefObject<Selection>
) => {
  let _innerHTML = e.currentTarget.innerHTML;
  const firstText = _innerHTML.split("<", 1)[0];
  if (firstText !== "") {
    e.currentTarget.innerHTML = _innerHTML.replace(
      firstText,
      `<div>${firstText}</div>`
    );
    selection.current.collapse(e.currentTarget.firstElementChild, 1);
  }
};

export const replaceBold = (
  $editable: MutableRefObject<HTMLDivElement>,
  selection: MutableRefObject<Selection>
) => {
  const focusNode = selection.current.focusNode.parentNode;
  const anchorNode = selection.current.anchorNode.parentNode;
  const childNodes = $editable.current.childNodes;
  const children = $editable.current.children;
  let innerHTMLs = "";

  childNodes.forEach((value, index) => {
    if (selection.current.containsNode(value, true) === false) {
      return;
    }
    const _child = children[index];
    let _targetString = "";
    if (focusNode.isSameNode(value)) {
      _targetString = _child.textContent.substring(
        0,
        selection.current.anchorOffset
      );
      console.log(`focus ${_targetString}`);
      innerHTMLs += _targetString;
      return;
    }
    if (anchorNode.isSameNode(value)) {
      _targetString = _child.textContent.substring(
        selection.current.focusOffset
      );
      console.log(`anchor ${_targetString}`);
      innerHTMLs += _targetString;
      return;
    }

    innerHTMLs += _child.outerHTML;
  });
  console.log(`inner HTMLs is ${innerHTMLs}`);
  console.log(`editable innerhtml
   is ${$editable.current.innerHTML}`);
  //   console.log(innerHTML);
  /*
   
  // console.log(childNodes);
  childNodes.forEach((value, index) => {
    if (selection.current.containsNode(value, true) === false) {
      return;
    }
    if (focusNode.isSameNode(value)) {
      // console.log(`focus node's index is ${index}`);
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
        `${_surplusString}<strong>${_targetString}<strong>`
      );

      return;
    }
    if (anchorNode.isSameNode(value)) {
      // console.log(`anchor node's index is ${index}`);
      const child = children[index];

      const _targetString = child.textContent.substring(
        selection.current.focusOffset
      );
      const _surplusString = child.textContent.substring(
        0,
        selection.current.focusOffset
      );
      child.innerHTML = child.innerHTML.replace(
        child.textContent,
        `<strong>${_targetString}<strong>${_surplusString}`
      );

      return;
    }

    // console.log(`${index}'s node is contained in selection`);
    const child = children[index];
    const childNode = childNodes[index];
    //   console.log(child.tagName);
    child.innerHTML = child.innerHTML.replace(
      child.textContent,
      `<strong>${child.textContent}<strong>`
    );

    // console.log(index);
  });
   */
};
