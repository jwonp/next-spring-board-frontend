import styles from "@src/styles/board/content/edit/AddTypeModel.module.scss";
import Image from "next/image";
import { Location } from "@src/static/types/LocationType";
import { useEffect, useRef } from "react";
import { NewContentBar, ContentType } from "@src/static/types/ContentDataType";
import { useSession } from "next-auth/react";
import { ImageUploadResponse } from "@src/static/types/ImageUploadType";
import { useAppDispatch } from "@src/redux/hooks";
import { addImage, addNewContent } from "@src/redux/features/content";
import { sendFile } from "@src/components/func/RequestFuncs";

const AddTypeModel = ({
  isOpen,
  mouseOnIndex,
  location,

  setIsOpen,
}: {
  isOpen: boolean;
  location: Location;
  mouseOnIndex: number;

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const $wrapper = useRef<HTMLDivElement>(null);
  const $fileInput = useRef<HTMLInputElement>(null);
  const $mouseOnIndex = useRef<number>(null);
  const dispatch = useAppDispatch();
  const iconSize = { width: 32, height: 32 };
  const IMAGE_ACCEPT = "image/*";
  const { data: session } = useSession();
  useEffect(() => {
    if (!location) return;
    $wrapper.current.style.left = `${location.x}px`;
    $wrapper.current.style.top = `${location.y}px`;
  }, [isOpen, location]);

  const handleClickBackground = () => {
    setIsOpen(false);
  };

  const handleClickText = (e: React.MouseEvent<HTMLDivElement>) => {
    const newContentData: NewContentBar = {
      target: mouseOnIndex,
      content: "",
      type: e.currentTarget.getAttribute("data-value") as ContentType,
    };
    dispatch(addNewContent(newContentData));
  };

  const handleClickImage = (e: React.MouseEvent<HTMLDivElement>) => {
    $mouseOnIndex.current = mouseOnIndex;
    $fileInput.current.click();
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = $fileInput.current.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", session.user.id);

    sendFile(formData).then((res) => {
      const imageMeta = res.data as ImageUploadResponse;
      dispatch(addImage(imageMeta.fileNameOnStoarge));

      const newContentData: NewContentBar = {
        target: $mouseOnIndex.current,
        content: imageMeta.fileNameOnStoarge,
        type: "image" as ContentType,
      };

      dispatch(addNewContent(newContentData));
    });
  };

  return (
    <div
      className={`${styles.background} ${
        isOpen === false ? styles.invisible : ""
      }`}
      onClick={handleClickBackground}>
      <div
        ref={$wrapper}
        className={`${styles.wrapper}`}>
        <div
          className={`${styles.item}`}
          onClick={handleClickText}
          data-value={"text"}>
          <Image
            src={"/text.svg"}
            alt={"No text svg"}
            width={iconSize.width}
            height={iconSize.height}
          />
          <div>텍스트</div>
        </div>
        <div
          className={`${styles.item}`}
          onClick={handleClickImage}
          data-value={"image"}>
          <Image
            src={"/image.svg"}
            alt={"No image svg"}
            width={iconSize.width}
            height={iconSize.height}
          />
          <div>이미지</div>
        </div>
      </div>
      <input
        ref={$fileInput}
        type={"file"}
        accept={IMAGE_ACCEPT}
        className={`${styles.invisible}`}
        onChange={handleChangeInput}
        multiple={false}
      />
    </div>
  );
};

export default AddTypeModel;
