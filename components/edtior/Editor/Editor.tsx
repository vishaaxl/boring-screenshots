import { useEditorContext } from "@/context/Editor";
import Image from "next/image";
import { ChangeEvent, ReactNode, useRef } from "react";
import { BiReset } from "react-icons/bi";
import { BsBookmark, BsRepeat } from "react-icons/bs";
import { TfiExport } from "react-icons/tfi";
import DropZone from "./DropZone";
import EditorWrapper from "./EditorWrapper";
import ImageWrapper from "./ImageWrapper";
import {
  downloadimageJpeg,
  downloadimagePng,
  downloadimageSvg,
} from "./downloads";
import { toast } from "react-hot-toast";

interface Props {}

const Editor: React.FC<Props> = () => {
  const { updateData, resetChanges, selectedImage, noise, watermark } =
    useEditorContext();

  const imageToDownload = useRef<HTMLDivElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      updateData && updateData("selectedImage", fileUrl);
    }
  };

  const handleReset = () => {
    let confirmation = confirm(
      "Confirm Reset - All your changes will be lost!"
    );

    if (confirmation) {
      resetChanges && resetChanges();
    }
  };

  const OptionButtonOutline = ({
    title,
    onTap,
    children,
  }: {
    children: ReactNode;
    title: string;
    onTap?: () => void;
  }) => {
    return (
      <div
        className="text-primary-content bg-base-100 py-2 px-3 flex items-center justify-center gap-3 border-2 border-base-200 rounded-md hover:bg-base-200 cursor-pointer"
        onClick={onTap}
      >
        {children}
        <span>{title}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-start flex-col h-full w-full">
      {/* Top options */}
      <div
        style={{ pointerEvents: selectedImage ? "auto" : "none" }}
        className={`grid grid-cols-2 gap-2 w-full mb-3 lg:flex lg:justify-end lg:items-center ${
          selectedImage ? "opacity-100" : "opacity-80"
        }`}
      >
        <div className="dropdown">
          <label tabIndex={0}>
            <OptionButtonOutline title="Export Image">
              <TfiExport />
            </OptionButtonOutline>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content p-2 mt-1 menu bg-base-100 w-full min-w-[262px] border-2 rounded-md"
          >
            <li onClick={() => downloadimagePng(imageToDownload.current, 1)}>
              <a>Export as PNG 1x</a>
            </li>
            <li onClick={() => downloadimagePng(imageToDownload.current, 2)}>
              <a>Export as PNG 2x</a>
            </li>
            <li onClick={() => downloadimagePng(imageToDownload.current, 4)}>
              <a>Export as PNG 4x</a>
            </li>
            <li onClick={() => downloadimageSvg(imageToDownload.current, 2)}>
              <a>Export as SVG</a>
            </li>
            <li onClick={() => downloadimageJpeg(imageToDownload.current, 2)}>
              <a>Export as JPEG</a>
            </li>
          </ul>
        </div>

        <label htmlFor="selected-image-reset">
          <input
            type="file"
            hidden
            accept="image/*"
            id="selected-image-reset"
            onChange={(e) => handleImageChange(e)}
          />
          <OptionButtonOutline title="Reset Image">
            <BsRepeat className="icon" />
          </OptionButtonOutline>
        </label>

        <OptionButtonOutline title="Reset Canvas" onTap={handleReset}>
          <BiReset className="icon" />
        </OptionButtonOutline>

        {/* <label htmlFor="my-modal-4"> */}
        <OptionButtonOutline
          title="Save Preset"
          onTap={() =>
            toast("This feature is paid, and will be available soon")
          }
        >
          <BsBookmark className="icon" />
        </OptionButtonOutline>
        {/* </label> */}
      </div>

      {/* Editor Wrapper */}
      <EditorWrapper imageRef={imageToDownload}>
        <>
          {noise && (
            <div className="absolute z-0 inset-0 h-full w-full opacity-20 bg-repeat bg-[length:20%] bg-[url('/images/noise.png')]" />
          )}
          {selectedImage ? (
            <ImageWrapper>
              <Image
                priority
                src={selectedImage}
                height={200}
                width={200}
                unoptimized
                alt=""
                className="block bg-contain w-full h-full"
              />
            </ImageWrapper>
          ) : (
            <DropZone />
          )}
          {watermark.visible && (
            <span
              className="text-primary-content absolute bottom-3 right-4 z-20 color-base-100 opacity-90 font-medium outline-none font-sans text-[1rem]"
              spellCheck={false}
              suppressContentEditableWarning={true}
              contentEditable
            >
              {watermark.value}
            </span>
          )}
        </>
      </EditorWrapper>
    </div>
  );
};

export default Editor;
