import { useEditorContext } from "@/context/Editor";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";

import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

interface Props {}

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
    console.log(filePicker);
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
    <div className="p-[1rem] sm:p-[2rem] bg-base-100 relative z-20 rounded-md">
      {/* header */}
      <div className="flex gap-1 flex-col">
        <div className="flex items-start gap-4 sm:gap-10">
          <h2 className="font-semibold text-[1.5rem] text-primary-content">
            Upload and Start Editing
          </h2>
          <div className="text-[1.5rem] text-primary-content">&#10022;</div>
        </div>
        <span className="text-[.8rem] opacity-90">
          Say NO to boring screenshots
        </span>
      </div>
      {/* upload */}
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center gap-2 aspect-[2/1] p-[2rem] border-[2px] border-primary-content rounded-[20px] border-dashed my-4"
      >
        <BsUpload
          className="opacity-90 text-[2rem] cursor-pointer"
          onClick={handleFilePickerClick}
        />
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
          {...getInputProps()}
        />
        <h3>
          <span className="underline" onClick={handleFilePickerClick}>
            Click to upload
          </span>{" "}
          or drag and drop
        </h3>
        <span>Maximum file size 30mb</span>
      </div>
      <div className="progress section"></div>

      {/* button wrapper */}

      <div className="grid grid-cols-2 gap-2">
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
          ref={filePicker}
        />
        <button
          disabled={loading}
          className="btn rounded-md font-medium w-full"
          onClick={handleFilePickerClick}
        >
          {isDragActive ? "UPLOAD" : "START EDITING"}
        </button>
        <button
          disabled={loading}
          className="btn btn-outline font-medium rounded-md w-full"
        >
          MOCKUPS
        </button>
      </div>
    </div>
  );
};

export default DropZone;
