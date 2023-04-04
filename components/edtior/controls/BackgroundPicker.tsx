import { useEditorContext } from "@/context/Editor";
import { gradients, solidGradients } from "@/data/gradients";
import { directionArray } from "@/data/misc";
import { BackgroundType, GradientProps } from "@/interface";
import { useState } from "react";

import BackgroundTile from "./BackgroundTile";

interface Props {
  closePicker: () => void;
}

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
    <div className="absolute right-0 top-full py-2 px-4 bg-base-100 z-20 border-[2px] border-base-200 rounded-md">
      {/* Tab selecter */}
      <div className="grid grid-cols-2 bg-base-200 rounded-md p-[0.125rem] mb-3">
        <span
          className={`cursor-pointer text-center rounded-md inline-block font-medium py-2 px-3 ${
            isActive == "gradient" && "bg-base-100"
          }`}
          onClick={() => setIsActive("gradient")}
        >
          Gradient
        </span>
        <span
          className={`cursor-pointer text-center rounded-md inline-block font-medium py-2 px-3 ${
            isActive == "solid" && "bg-base-100"
          }`}
          onClick={() => setIsActive("solid")}
        >
          Solid
        </span>
      </div>
      <div className="grid grid-cols-6 gap-[0.1rem]">
        {isActive == "gradient"
          ? gradients.map((bg) => (
              <BackgroundTile
                key={bg.id}
                background={bg.background}
                size="52px"
                onTap={() => updateCurrentBackground(bg)}
              />
            ))
          : solidGradients.map((bg) => (
              <BackgroundTile
                key={bg.id}
                background={bg.background}
                size="52px"
                onTap={() => updateCurrentBackground(bg)}
              />
            ))}
      </div>
      {isActive == "gradient" && (
        <>
          <div className="flex flex-col py-4 gap-1">
            <div className="flex justify-between items-center">
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
            <div className="flex gap-1">
              {directionArray.map((dir) => (
                <span
                  className={`h-[52px] w-[52px] p-4 border-[2px] flex items-center justify-center rounded-md border-base-200 cursor-pointer hover:bg-base-200 ${
                    customGradient.direction == dir.name
                      ? "bg-base-200"
                      : "bg-base-100"
                  }`}
                  key={dir.id}
                  onClick={() => onCustomGradientChange("direction", dir.name)}
                >
                  {dir.icon}
                </span>
              ))}
            </div>
          </div>
          <button
            className="btn w-full font-medium"
            onClick={() => applyCustomGradient()}
          >
            Apply Custom Gradient
          </button>
        </>
      )}
    </div>
  );
};
export default BackgroundPickerWidget;
