import { counterGenerator } from "@src/components/func/errorCounter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Error = () => {
  const [count, setCount] = useState<number>(5);
  const router = useRouter();
  useEffect(() => {
    let counter = counterGenerator(setCount);
    setTimeout(() => {
      counter.next();
    }, 1000);
    setTimeout(() => {
      counter.next();
    }, 2000);
    setTimeout(() => {
      counter.next();
    }, 3000);
    setTimeout(() => {
      counter.next();
    }, 4000);
    setTimeout(() => {
      counter.next();
      router.push("/");
    }, 5000);
  }, []);
  return <p>잘못된 접근입니다. {count} 초 후 로비로 돌아갑니다</p>;
};

export default Error;
