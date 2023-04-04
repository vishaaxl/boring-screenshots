interface Props {
  onTap: () => void;
  title: string;
  active: boolean;
}

const IconTile: React.FC<Props> = ({ title, onTap, active }) => {
  return (
    <div
      onClick={onTap}
      className={`rounded-md border-[2px] border-base-200 py-2 px-3 cursor-pointer hover:bg-base-200 ${
        active && "bg-base-200"
      }`}
    >
      <span>{title}</span>
    </div>
  );
};

export default IconTile;
