import { ContentDataType } from "@src/static/types/ContentDataType";
import styles from "@src/styles/board/content/ImageBar.module.scss";
import Image from "next/image";
const ImageBar = ({
  data,
  index,
  focus,
}: {
  data: ContentDataType;
  index: number;
  focus: React.MutableRefObject<number>;
}) => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.image_box}`}>
        <Image
          src={data.image}
          alt={"No Image"}
          width={100}
          height={100}
          //   fill
          //   sizes="(max-width: 768px) 100vw,
          //         (max-width: 1200px) 50vw,
          //         33vw"
          style={{ position: "relative" }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ImageBar;
