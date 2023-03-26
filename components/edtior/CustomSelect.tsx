import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  title: string;
  icon: JSX.Element;
}

const SelectContainer = styled.div`
  background: ${({ theme }) => theme.foreground};
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.light};

  position: absolute;
  right: 0;
  top: 100%;
  z-index: 15;

  .header {
    background: ${({ theme }) => theme.light};
    padding: 0.5rem 1rem;
    font-size: 0.7rem;
    font-weight: 500;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 1rem;
    }
  }
`;

const CustomSelect: React.FC<Props> = ({ children, title, icon }) => {
  return (
    <SelectContainer>
      <div className="header">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </SelectContainer>
  );
};

export default CustomSelect;
