import { Dispatch, SetStateAction } from "react";

export function* counterGenerator(setCount: Dispatch<SetStateAction<number>>) {
  setCount(4);
  yield 10;
  setCount(3);
  yield 20;
  setCount(2);
  yield 30;
  setCount(1);
  yield 40;
  setCount(0);
  yield 50;
}
