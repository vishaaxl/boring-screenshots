import styled from "styled-components";

interface Props {
  title: string;
  onTap: () => void;
}

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.accent.secondary};
  color: ${({ theme }) => theme.foreground};
  border-radius: 5px;
`;

const PrimaryButton: React.FC<Props> = ({ title, onTap }) => {
  return <Button onClick={() => onTap()}>{title}</Button>;
};
export default PrimaryButton;
