import {
  isLoactionXOnTarget,
  isLoactionYOnTarget,
  relocateControl,
} from "@src/components/func/ContentEditFuncs";
import { ContainerSizeType } from "@src/static/types/ContainerSizeType";
import { ContentBarDataType } from "@src/static/types/ContentDataType";
import { ImageSizeType } from "@src/static/types/ImageSizeType";
import { LocationType } from "@src/static/types/LocationType";
import styles from "@src/styles/board/content/ImageBar.module.scss";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
const ImageBar = ({
  data,
  index,
  mouseOnIndex,
  mouseLocation,
  scroll,
  control,
  onDragIndex,
}: {
  data: ContentBarDataType;
  index: number;
  mouseOnIndex: React.MutableRefObject<number>;
  mouseLocation: React.MutableRefObject<LocationType>;
  scroll: React.MutableRefObject<number>;
  control: React.MutableRefObject<HTMLDivElement>;
  onDragIndex: React.MutableRefObject<number>;
}) => {
  const $wrapper = useRef<HTMLDivElement>(null);
  const $image = useRef<HTMLDivElement>(null);
  const $wrapperSizes = useRef<ContainerSizeType>(null);
  const [imageSize, setImageSize] = useState<ImageSizeType>({
    width: 100,
    height: 100,
  });

  const DynamicImage = useMemo(() => {
    return (
      <Image
        src={data.image}
        alt={"No Image"}
        width={imageSize.width}
        height={imageSize.height}
        //   fill
        //   sizes="(max-width: 768px) 100vw,
        //         (max-width: 1200px) 50vw,
        //         33vw"
        priority={true}
        draggable={false}
      />
    );
  }, [data.image, imageSize.height, imageSize.width]);
  useEffect(() => {
    const sizes: ContainerSizeType = {
      left: $wrapper.current.offsetLeft,
      top: $wrapper.current.offsetTop,
      width: $wrapper.current.offsetWidth,
      height: $wrapper.current.offsetHeight,
    };
    $wrapperSizes.current = sizes;
  }, []);

  const handleMouseMove = () => {
    console.log(mouseOnIndex.current);
    if (
      isLoactionXOnTarget(
        mouseLocation.current.x,
        $wrapperSizes.current?.left,
        $wrapperSizes.current.width
      ) &&
      isLoactionYOnTarget(
        mouseLocation.current.y,
        $wrapperSizes.current.top,
        $wrapperSizes.current.height,
        scroll.current
      )
    ) {
      mouseOnIndex.current = index;

      relocateControl(
        $wrapper.current,
        control.current,
        onDragIndex.current,
        scroll.current
      );
    }
  };
  return (
    <div
      ref={$wrapper}
      className={`${styles.wrapper}`}
      onMouseMove={handleMouseMove}>
      <div ref={$image} className={`${styles.image_box}`}>
        {DynamicImage}
      </div>
    </div>
  );
};

export default ImageBar;
