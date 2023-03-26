import { useEditorContext } from "@/context/Editor";
import { gradients, solidGradients } from "@/data/gradients";
import { directionArray } from "@/data/misc";
import { BackgroundType, GradientProps } from "@/interface";
import { useState } from "react";

import styled from "styled-components";
import PrimaryButton from "../common/Button";

interface Props {
  closePicker: () => void;
}

interface BackgroundTileProps {
  data: string;
  size?: string;
}

export const BackgroundTile = styled.div<BackgroundTileProps>`
  cursor: pointer;
  border-radius: 2px;
  height: ${({ size }) => size || "32px"};
  width: ${({ size }) => size || "32px"};

  background: #a8c0ff;
  background: ${({ data }) => data};
`;

const BackgroundPicker = styled.div`
  padding: 0.5rem 1rem 1rem 1rem;
  background: ${({ theme }) => theme.foreground};
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.light};

  position: absolute;
  right: 0;
  top: 100%;
  z-index: 12;

  .options-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.1rem;
  }
`;

const TabSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: ${({ theme }) => theme.light};
  border-radius: 5px;
  padding: 0.125rem;
  margin-bottom: 0.75rem;

  span {
    cursor: pointer;
    text-align: center;
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.5rem 0.75rem;
  }

  .active {
    border-radius: 5px;
    background: ${({ theme }) => theme.foreground};
  }
`;

const CustomGradientSelector = styled.div`
  padding: 1rem 0;

  .colors {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .direction {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.1rem;
    padding-top: 1rem;

    span {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 52px;
      width: 52px;
      border-radius: 4px;
      border: 2px solid ${({ theme }) => theme.light};

      &:hover {
        background: ${({ theme }) => theme.light};
      }
    }

    .active-direction {
      background: ${({ theme }) => theme.light};
    }
  }

  input[type="color"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 42px;
    height: 42px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  input[type="color"]::-webkit-color-swatch {
    border-radius: 5px;
    border: none;
  }

  input[type="color"]::-moz-color-swatch {
    border-radius: 5px;
    border: none;
  }
`;

const BackgroundPickerWidget: React.FC<Props> = ({ closePicker }) => {
  const { currentBackground, updateData, updateBackground } =
    useEditorContext();
  const [isActive, setIsActive] = useState("gradient");

  const [customGradient, setCustomGradient] = useState<GradientProps>({
    color1: currentBackground.color1,
    color2: currentBackground.color2,
    color3: currentBackground.color3,
    direction: currentBackground.direction,
    background: currentBackground.background,
  });

  const updateCurrentBackground = (bgData: GradientProps) => {
    const { id, ...data } = bgData;

    if (updateBackground && updateData) {
      updateBackground(data);

      if (data.color1 == data.color2) {
        updateData("currentBackgroundType", BackgroundType.solid);
      } else {
        updateData("currentBackgroundType", BackgroundType.gradient);
      }

      closePicker();
    }
  };

  const onCustomGradientChange = (name: string, value: string) => {
    setCustomGradient((prev) => ({
      ...prev,
      [name]: value,
      background: `linear-gradient(${prev.direction}, ${prev.color1}, ${prev.color2})`,
    }));
  };

  const applyCustomGradient = () => {
    updateCurrentBackground(customGradient);
  };

  return (
    <BackgroundPicker>
      <TabSelector>
        <span
          className={isActive == "gradient" ? "active" : "in-active"}
          onClick={() => setIsActive("gradient")}
        >
          Gradient
        </span>
        <span
          className={isActive == "solid" ? "active" : "in-active"}
          onClick={() => setIsActive("solid")}
        >
          Solid
        </span>
      </TabSelector>
      <div className="options-wrapper">
        {isActive == "gradient"
          ? gradients.map((bg) => (
              <BackgroundTile
                key={bg.id}
                data={bg.background}
                size="52px"
                onClick={() => updateCurrentBackground(bg)}
              />
            ))
          : solidGradients.map((bg) => (
              <BackgroundTile
                key={bg.id}
                data={bg.background}
                size="52px"
                onClick={() => updateCurrentBackground(bg)}
              />
            ))}
      </div>
      {isActive == "gradient" && (
        <>
          <CustomGradientSelector>
            <div className="colors">
              <span>Custom Gradient</span>
              <div>
                <input
                  value={customGradient.color1}
                  type="color"
                  name="color1"
                  onChange={(e) =>
                    onCustomGradientChange(e.target.name, e.target.value)
                  }
                />
                <input
                  value={customGradient.color2}
                  type="color"
                  name="color2"
                  onChange={(e) =>
                    onCustomGradientChange(e.target.name, e.target.value)
                  }
                />
                <input
                  value={customGradient.color3}
                  type="color"
                  name="color3"
                  onChange={(e) =>
                    onCustomGradientChange(e.target.name, e.target.value)
                  }
                />
              </div>
            </div>
            <div className="direction">
              {directionArray.map((dir) => (
                <span
                  className={`icon-wrapper ${
                    customGradient.direction == dir.name && "active-direction"
                  }`}
                  key={dir.id}
                  onClick={() => onCustomGradientChange("direction", dir.name)}
                >
                  {dir.icon}
                </span>
              ))}
            </div>
          </CustomGradientSelector>
          <PrimaryButton
            title="Apply Custom Gradient"
            onTap={() => applyCustomGradient()}
          />
        </>
      )}
    </BackgroundPicker>
  );
};
export default BackgroundPickerWidget;
