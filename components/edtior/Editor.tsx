import { useEditorContext } from "@/context/Editor";
import Image from "next/image";
import { ChangeEvent } from "react";
import { BiReset } from "react-icons/bi";
import { BsBookmark, BsCrop, BsRepeat, BsTextLeft } from "react-icons/bs";
import styled from "styled-components";
import { Open_Sans } from "next/font/google";
import DropZone from "./DropZone";

const waterMarkFont = Open_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
});

interface EditorWrapperProps {
  background: string;
  ratio: string;
  padding: number;
  borderRadius: number;
  selectedImage: string | null;
}

interface ImageWrapperProps {
  scale: number;
  borderRadius: number;
  tilt: string;
  boxShadow: string;
  selectedImage: string | null;
}

const EditorWrapper = styled.section<EditorWrapperProps>`
  aspect-ratio: ${({ ratio }) => ratio};
  height: ${({ selectedImage }) => (selectedImage ? "fit-content" : "100%")};
  width: ${({ selectedImage }) => (selectedImage ? "fit-content" : "100%")};
  max-height: calc(100vh - 150px);
  background: #a8c0ff;
  background: ${({ background }) => background};
  background-size: cover;
  background-position: center center;

  padding: ${({ padding, selectedImage }) =>
    selectedImage ? `${padding}px` : "16px"};
  overflow: hidden;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .noise {
    position: absolute;
    z-index: 0;
    inset: 0;
    height: 100%;
    width: 100%;
    opacity: 0.2;

    background: url("/images/noise.png");
    background-size: 20%;
    background-repeat: repeat;
  }
`;

const ImageWrapper = styled.div<ImageWrapperProps>`
  will-change: transform;
  transform-style: preserve-3d;
  transition: transform 0.3s;
  height: ${({ selectedImage }) => (selectedImage ? "fit-content" : "100%")};
  width: ${({ selectedImage }) => (selectedImage ? "fit-content" : "100%")};

  overflow: hidden;
  box-shadow: ${({ boxShadow }) => boxShadow};

  border-radius: ${({ borderRadius }) => `${borderRadius}px`};

  transform-origin: 50% 50%;
  transform: ${({ tilt, scale }) =>
    `scale(${scale}) perspective(75em) ${tilt}`};

  position: relative;

  .image-to-edit {
    display: block;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  @media (min-width: 900px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  width: 100%;

  margin-bottom: 0.75rem;

  div {
    border: 2px solid ${({ theme }) => theme.light};
    background: ${({ theme }) => theme.foreground};
    border-radius: 5px;

    cursor: pointer;
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.5rem 0.75rem;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background: ${({ theme }) => theme.light};
    }
  }
`;

const Watermark = styled.span`
  position: absolute;
  bottom: 0.75rem;
  right: 1rem;
  z-index: 20;
  color: ${({ theme }) => theme.foreground};
  opacity: 0.9;
  outline: none;
  font-weight: 500;
`;

interface Props {}

const Editor: React.FC<Props> = () => {
  const {
    currentBackground: { background },
    padding,
    scale,
    borderRadius,
    canvasRoundness,
    tilt,
    aspectRatio,
    currentBoxShadow,
    noise,

    selectedImage,
    updateData,
    resetChanges,
    watermark,
  } = useEditorContext();

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

  return (
    <MainContainer>
      <Options>
        <div>
          <BsCrop />
          <span>Crop Image</span>
        </div>

        <label htmlFor="selected-image-reset">
          <input
            type="file"
            hidden
            accept="image/*"
            id="selected-image-reset"
            onChange={(e) => handleImageChange(e)}
          />
          <div>
            <BsRepeat className="icon" />
            <span>Replace Image</span>
          </div>
        </label>
        <div onClick={handleReset}>
          <BiReset className="icon" />
          <span>Reset</span>
        </div>
        <div>
          <BsBookmark className="icon" />
          <span>Save Preset</span>
        </div>
      </Options>
      <EditorWrapper
        selectedImage={selectedImage}
        background={background}
        padding={padding}
        ratio={aspectRatio.value}
        borderRadius={canvasRoundness}
      >
        {noise && <div className="noise" />}
        {selectedImage ? (
          <ImageWrapper
            selectedImage={selectedImage}
            scale={scale}
            borderRadius={borderRadius}
            tilt={tilt?.value}
            boxShadow={currentBoxShadow.value}
          >
            <Image
              priority
              src={selectedImage}
              height={200}
              width={200}
              unoptimized
              alt=""
              className="image-to-edit"
            />
          </ImageWrapper>
        ) : (
          <DropZone />
        )}
        {watermark.visible && (
          <Watermark
            className={waterMarkFont.className}
            spellCheck={false}
            suppressContentEditableWarning={true}
            contentEditable
          >
            {watermark.value}
          </Watermark>
        )}
      </EditorWrapper>
    </MainContainer>
  );
};

export default Editor;
