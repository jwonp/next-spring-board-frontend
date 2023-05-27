import {
  LikedURL,
  MyPageContentListFetcher,
  WrittenURL,
} from "@src/components/fetcher/MyPageContentListFetcher";
import { convertNumberToUnitK } from "@src/components/func/NumberShortFunc";
import { VIEW_SVG } from "@src/static/strings/IconSrc";
import { SIZES } from "@src/static/strings/stringSet";
import styles from "@src/styles/mypage/index.module.scss";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import ContentBar from "@src/components/module/board/ContentBar";
const MyPageIndex = () => {
  const { data: session } = useSession();
  const [SWRkey, setSWRkey] = useState<string>("");
  const { data } = useSWR(
    SWRkey !== "" ? SWRkey : null,
    MyPageContentListFetcher
  );
  useEffect(() => {
    if (SWRkey !== "") {
      return;
    }
    if (session === undefined && session?.user === undefined) {
      return;
    }
    setSWRkey(LikedURL(session.user.id));
  }, [session]);
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
              defaultChecked={true}
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
        <div className={`${styles.box}`}>
          {data?.map((value, index) => {
            return (
              <ContentBar
                data={value}
                boardTitle={value.board}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPageIndex;
