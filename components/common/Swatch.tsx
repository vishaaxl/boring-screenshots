import { useEditorContext } from "@/context/Editor";
import styled from "styled-components";

interface Props {
  onTap: (e: boolean) => void;
  checked: boolean;
}

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;

  input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + .slider {
    background-color: ${({ theme }) => theme.background};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${({ theme }) => theme.background};
  }

  input:checked + .slider:before {
    transform: translateX(16px);
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.light};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 2px;

    &::before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 2px;
    }
  }
`;
const Swatch: React.FC<Props> = ({ onTap, checked }) => {
  return (
    <>
      <Switch>
        <input
          checked={checked}
          type="checkbox"
          onChange={(e) => onTap(e.target.checked)}
        />

        <span className="slider round" />
      </Switch>
    </>
  );
};
export default Swatch;
