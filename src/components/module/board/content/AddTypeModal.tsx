import styles from "@src/styles/board/content/AddTypeModel.module.scss";
import Image from "next/image";
import { LocationType } from "@src/static/types/LocationType";
import { useEffect, useRef, useState } from "react";
import { AddContentType } from "@src/static/types/AddContentsType";
import { ContentTypeType } from "@src/static/types/ContentDataType";
import axios from "axios";
import { useSession } from "next-auth/react";
import { uploadResponseType } from "@src/static/types/uploadResponseType";
const AddTypeModel = ({
  isOpen,
  mouseOnIndex,
  location,
  addContent,
  setIsOpen,
}: {
  isOpen: boolean;
  location: LocationType;
  mouseOnIndex: number;
  addContent: AddContentType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const $wrapper = useRef<HTMLDivElement>(null);
  const $fileInput = useRef<HTMLInputElement>(null);
  const $mouseOnIndex = useRef<number>(null);
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
    addContent(
      mouseOnIndex,
      "",
      e.currentTarget.getAttribute("data-value") as ContentTypeType
    );
  };
  const handleClickImage = (e: React.MouseEvent<HTMLDivElement>) => {
    $mouseOnIndex.current = mouseOnIndex;
    $fileInput.current.click();
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = $fileInput.current.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", session.user.name);

    sendFile(formData).then((res) => {
      addContent(
        $mouseOnIndex.current,
        res.data.imageLocation,
        "image" as ContentTypeType
      );
    });
  };
  const sendFile = async (formData: FormData) => {
    return await axios.post("/api/board/file", formData, {
      headers: { "Content-Type": "multipart/form-data;charset=utf-8" },
    });
  };
  return (
    <div
      className={`${styles.background} ${
        isOpen === false ? styles.invisible : ""
      }`}
      onClick={handleClickBackground}>
      <div ref={$wrapper} className={`${styles.wrapper}`}>
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
