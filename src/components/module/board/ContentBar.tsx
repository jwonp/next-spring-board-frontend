import { convertNumberToUnitK } from "@src/components/func/stringTools";
import { sizes } from "@src/static/data/stringSet";
import { ContentType } from "@src/static/types/ContentType";
import styles from "@src/styles/board/content/ContentBar.module.scss";
import Image from "next/image";
import Link from "next/link";
const ContentBar = ({ data, title }: { data: ContentType; title: string }) => {
  return (
    <Link href={`/board/${title}/content/${data.id}`}>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.left}`}>
          <div className={`${styles.index}`}>{data.id}</div>
          <div className={`${styles.title}`}>{data.title}</div>
        </div>
        <div className={`${styles.right}`}>
          <div className={`${styles.views}`}>
            <div className={`${styles.icon}`}>
              <Image src={"/view.svg"} alt={"No icon"} fill sizes={sizes} />
            </div>
            <div className={`${styles.count}`}>
              {convertNumberToUnitK(data.views)}
            </div>
          </div>
          <div className={`${styles.likes}`}>
            <div className={`${styles.icon}`}>
              <Image src={"/like.svg"} alt={"No icon"} fill sizes={sizes} />
            </div>
            <div className={`${styles.count}`}>
              {convertNumberToUnitK(data.likes)}
            </div>
          </div>
          <div className={`${styles.author}`}>{data.author}</div>
          <div className={`${styles.update_date}`}>{data.update_date}</div>
        </div>
      </div>
    </Link>
  );
};

export default ContentBar;
