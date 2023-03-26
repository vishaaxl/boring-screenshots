import { useState } from "react";
import styled from "styled-components";
import PrimaryButton from "./Button";

interface Props {
  title: string;
  value: string;
  onTap: (value: string) => void;
}

const Wrapper = styled.div`
  padding: 0.5rem 1rem 1rem 1rem;
  display: flex;

  display: grid;
  gap: 0.5rem;

  textarea {
    outline: none;
    border-radius: 2px;
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
`;

const InputButton: React.FC<Props> = ({ title, value, onTap }) => {
  const [textareaData, setTextareaData] = useState(value);
  return (
    <Wrapper>
      <textarea
        spellCheck={false}
        rows={3}
        value={textareaData}
        onChange={(e) => setTextareaData(e.target.value)}
      />
      <PrimaryButton title={title} onTap={() => onTap(textareaData)} />
    </Wrapper>
  );
};
export default InputButton;
