interface Props {
  background: string;
  size?: string;
  onTap: () => void;
}

const BackgroundTile: React.FC<Props> = ({ background, size, onTap }) => {
  return (
    <div
      onClick={onTap}
      style={{
        backgroundImage: background,
        backgroundSize: "cover",
        width: size || "32px",
        height: size || "32px",
      }}
      className="rounded-sm cursor-pointer bg-[#a8c0ff]"
    />
  );
};
export default BackgroundTile;
