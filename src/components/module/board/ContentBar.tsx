import { getDateAsShortString } from "@src/components/func/DateParser";
import { convertNumberToUnitK } from "@src/components/func/NumberShortFunc";
import { VIEW_SVG } from "@src/static/strings/IconSrc";
import { SIZES } from "@src/static/strings/stringSet";
import { ContentData } from "@src/static/types/ContentType";
import styles from "@src/styles/board/content/ContentBar.module.scss";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";

const ContentBar = ({
  data,
  boardTitle,
}: {
  data: ContentData;
  boardTitle: string;
}) => {
  return (
    <Link href={`/board/${boardTitle}/content/${data.contentMetaId}`}>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.left}`}>
          <div className={`${styles.title}`}>{data.title}</div>
        </div>
        <div className={`${styles.right}`}>
          <div className={`${styles.views}`}>
            <div className={`${styles.icon}`}>
              <Image
                src={VIEW_SVG.src}
                alt={VIEW_SVG.alt}
                fill
                sizes={SIZES}
              />
            </div>
            <div className={`${styles.count}`}>
              {convertNumberToUnitK(data.views)}
            </div>
          </div>
          <div className={`${styles.likes}`}>
            <div className={`${styles.icon}`}>
              <Image
                src={"/like.svg"}
                alt={"No icon"}
                fill
                sizes={SIZES}
              />
            </div>
            <div className={`${styles.count}`}>
              {convertNumberToUnitK(data.likes)}
            </div>
          </div>
          <div className={`${styles.author}`}>{data.author}</div>
          <div className={`${styles.created_date}`}>
            {getDateAsShortString(data.created, DateTime.now())}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentBar;
