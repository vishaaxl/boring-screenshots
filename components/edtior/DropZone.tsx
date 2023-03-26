import { useEditorContext } from "@/context/Editor";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import styled from "styled-components";

import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

interface Props {}

const DropZoneWrapper = styled.div`
  background: ${({ theme }) => theme.foreground};
  padding: 1rem;
  postion: relative;
  z-index: 20;
  border-radius: 20px;
`;

const Header = styled.div`
  gap: 4rem;

  div {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    @media (min-width: 425px) {
      gap: 5rem;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  span {
    font-size: 0.8rem;
    opacity: 0.9;
  }

  .icon {
    font-size: 1.5rem;
  }
`;

interface UploadProps {
  isDragActive: boolean;
}

const Upload = styled.div<UploadProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: 2px dashed ${({ theme }) => theme.background};
  margin: 1rem 0;
  border-radius: 20px;
  aspect-ratio: 2 / 1;
  padding: 2rem;
  text-align: center;

  .png {
    font-size: 2rem;
    opacity: 0.8;
    cursor: pointer;
  }

  span {
    font-size: 0.8rem;
  }

  h3 {
    span {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  button:disabled {
    opacity: 0.5;
  }

  .solid,
  .outline {
    font-size: 0.8rem;
    width: 100%;
    padding: 0.75rem;
    border-radius: 5px;
  }

  .solid {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.foreground};
  }

  .outline {
    background: transparent;
    border: 2px solid ${({ theme }) => theme.background};
  }
`;

const DropZone: React.FC<Props> = () => {
  const { updateData } = useEditorContext();
  const filePicker = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setLoading(true);
      const errors = rejectedFiles[0]?.errors;

      if (errors && errors?.length > 0) {
        errors.map((e) => console.log(e));
        errors.map((e) =>
          e.code == "file-invalid-type"
            ? toast("oops! Try uploading images.")
            : toast("oops! Size does matter here.")
        );
        setLoading(false);
        return;
      }

      const fileUrl = URL.createObjectURL(acceptedFiles[0]);

      if (updateData) {
        updateData("selectedImage", fileUrl);
      }

      setLoading(false);
    },
    [updateData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 30 * 1024 * 1024,
  });

  const handleFilePickerClick = () => {
    filePicker.current?.click();
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      if (updateData) {
        updateData("selectedImage", fileUrl);
      }
    }
    setLoading(false);
  };

  return (
    <DropZoneWrapper {...getRootProps()}>
      <Header>
        <div>
          <h2>Upload and Start Editing</h2>
          <div className="icon">&#10022;</div>
        </div>
        <span>Say NO to boring screenshots</span>
      </Header>
      <Upload isDragActive={isDragActive}>
        <BsUpload className="png" onClick={handleFilePickerClick} />
        <h3>
          <span onClick={handleFilePickerClick}>Click to upload</span> or drag
          and drop
        </h3>
        <span>Maximum file size 30mb</span>
        <input
          type="file"
          hidden
          accept="image/*"
          ref={filePicker}
          onChange={handleImageUpload}
          {...getInputProps()}
        />
      </Upload>
      <div className="progress section"></div>
      <ButtonWrapper>
        <button
          disabled={loading}
          className="solid"
          onClick={handleFilePickerClick}
        >
          {loading ? "Uploading" : "Start Edting"}
        </button>
        <button disabled={loading} className="outline">
          Code Editor
        </button>
      </ButtonWrapper>
    </DropZoneWrapper>
  );
};

export default DropZone;
