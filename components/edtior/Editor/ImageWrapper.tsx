import { useEditorContext } from "@/context/Editor";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ImageWrapper: React.FC<Props> = ({ children }) => {
  const {
    selectedImage,
    currentBoxShadow,
    borderRadius,
    scale,
    tilt,
    left,
    right,
    rotate,
  } = useEditorContext();
  return (
    <div
      style={{
        transform: `scale(${scale}) perspective(90em) ${tilt.value} translateX(${left}%) translateY(${right}%) rotateZ(${rotate}deg)`,
        boxShadow: currentBoxShadow.value,
        transformStyle: "preserve-3d",
        borderRadius: borderRadius + "px",
      }}
      className={`
        ${selectedImage ? "h-fit" : "h-full"} \
        ${selectedImage ? "w-fit" : "w-full"} \
        overflow-hidden origin-center \
        transition-transform will-change-transform \
        relative
    `}
    >
      {children}
    </div>
  );
};

export default ImageWrapper;
