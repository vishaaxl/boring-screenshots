import { useEditorContext } from "@/context/Editor";
import { ReactNode, Ref } from "react";

interface Props {
  children: ReactNode;
  imageRef: Ref<HTMLDivElement> | null;
}

const EditorWrapper: React.FC<Props> = ({ children, imageRef }) => {
  const {
    currentBackground: { background },
    selectedImage,
    canvasRoundness,
    aspectRatio,
    padding,
  } = useEditorContext();
  return (
    <div
      ref={imageRef}
      style={{
        backgroundImage: background,
        backgroundSize: "cover",
        padding: `${selectedImage ? padding + "px" : "16px"}`,
        aspectRatio: `${aspectRatio.value}`,
      }}
      className={`
        flex justify-center items-center relative overflow-hidden \
        rounded-[${canvasRoundness}px] 
        bg-cover bg-center \
        bg-[#a8c0ff] \
        ${selectedImage ? "h-fit" : "h-full"} \
        ${selectedImage ? "w-fit" : "w-full"} \
        max-h-[calc(100vh-150px)]
        `}
    >
      {children}
    </div>
  );
};
export default EditorWrapper;
