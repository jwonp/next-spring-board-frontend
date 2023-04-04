import styles from "@src/styles/board/content/AddTypeModel.module.scss";
import Image from "next/image";
const AddTypeModel = () => {
  const iconSize = { width: 32, height: 32 };
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.item}`}>
        <Image
          src={"/text.svg"}
          alt={"No text svg"}
          width={iconSize.width}
          height={iconSize.height}
        />
        <div>텍스트</div>
      </div>
      <div className={`${styles.item}`}>
        <Image
          src={"/image.svg"}
          alt={"No image svg"}
          width={iconSize.width}
          height={iconSize.height}
        />
        <div>이미지</div>
      </div>
    </div>
  );
};

export default AddTypeModel;
