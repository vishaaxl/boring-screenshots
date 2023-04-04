import { useState } from "react";

interface Props {
  title: string;
  value: string;
  onTap: (value: string) => void;
}

const InputButton: React.FC<Props> = ({ title, value, onTap }) => {
  const [textareaData, setTextareaData] = useState(value);
  return (
    <div className="p-4 pt-2 grid gap-2">
      <textarea
        className="textArea outline-none border-[2px] border-base-200 rounded-md p-2"
        spellCheck={false}
        rows={3}
        value={textareaData}
        onChange={(e) => setTextareaData(e.target.value)}
      />
      <button
        className="btn w-full font-medium rounded-md"
        onClick={() => onTap(textareaData)}
      >
        {title}
      </button>
    </div>
  );
};
export default InputButton;
