import {
  LikedURL,
  MyPageContentListFetcher,
  WrittenURL,
} from "@src/components/fetcher/MyPageContentListFetcher";
import styles from "@src/styles/mypage/index.module.scss";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
const MyPageIndex = () => {
  const { data: session } = useSession();
  const [SWRkey, setSWRkey] = useState<string>("");
  const { data } = useSWR(
    SWRkey !== "" ? SWRkey : null,
    MyPageContentListFetcher
  );

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.container}`}>
        <form>
          <fieldset>
            <legend>{"choose content"}</legend>
            <input
              id={"liked"}
              type={"radio"}
              name={"content"}
              value={"liked"}
              onInput={() => {
                setSWRkey(
                  session && session.user ? LikedURL(session.user.id) : ""
                );
              }}
            />
            <label htmlFor={"liked"}>{"좋아요"}</label>
            <input
              id={"written"}
              type={"radio"}
              name={"content"}
              value={"written"}
              onInput={() => {
                setSWRkey(
                  session && session.user ? WrittenURL(session.user.id) : ""
                );
              }}
            />
            <label htmlFor={"written"}>{"내가 쓴 글"}</label>
          </fieldset>
        </form>
      </div>
      <div className={`${styles.container}`}>
        <div className={`${styles.box}`}>{"게시글 리스트"}</div>
        <div className={`${styles.box}`}>
          <div className={`${styles.card}`}>
            {typeof data === "string" ? data : "No"}
          </div>
          <div className={`${styles.card}`}>{1}</div>
          <div className={`${styles.card}`}>{2}</div>
          <div className={`${styles.card}`}>{3}</div>
          <div className={`${styles.card}`}>{4}</div>
        </div>
      </div>
    </div>
  );
};

export default MyPageIndex;
