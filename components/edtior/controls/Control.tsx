import { MouseEventHandler, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  value?: string | number | null;
  onTap?: () => void;
}

const Control: React.FC<Props> = ({ title, value, children, onTap }) => {
  return (
    <div
      className="flex justify-between items-center p-[1rem] border-b-2 cursor-pointer"
      onClick={onTap}
    >
      <div className="flex justify-between items-center gap-2">
        <span className="text-primary-content">{title}</span>
        {value != null && (
          <span className="px-3 py-1 text-[0.615rem] bg-base-200 rounded">
            {value}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default Control;
