interface Props {
  title: string;
}

const PanelHeading: React.FC<Props> = ({ title }) => {
  return (
    <h2 className="text-[0.8rem] text-center font-medium p-2 bg-base-200 text-primary-content">
      {title}
    </h2>
  );
};
export default PanelHeading;
