import styled from "styled-components";

interface Props {
  title: string;
  active: boolean;
  onTap: () => void;
}

interface TileProps {
  active: boolean;
}

const Tile = styled.div<TileProps>`
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.light};
  padding: 0.5rem 0.75rem;

  font-size: 0.8rem;
  cursor: pointer;
  background: ${({ active, theme }) =>
    active ? theme.light : theme.foreground};

  &:hover {
    background: ${({ theme }) => theme.light};
  }
`;

const IconTile: React.FC<Props> = ({ title, onTap, active }) => {
  return (
    <Tile onClick={onTap} active={active}>
      <span>{title}</span>
    </Tile>
  );
};

export default IconTile;
