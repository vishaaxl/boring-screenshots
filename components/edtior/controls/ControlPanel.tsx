import { ChangeEvent, ReactNode, useState } from "react";
import { BiChevronRight, BiReset } from "react-icons/bi";
import { BsAspectRatio, BsBookmarkFill } from "react-icons/bs";
import { SiShadow } from "react-icons/si";
import { FaDice } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";

// local
import BackgroundPickerWidget from "./BackgroundPicker";
import { useEditorContext } from "@/context/Editor";
import { BackgroundType } from "@/interface";
import { gereateRandomGradient } from "@/utils/randomGradient";

import CustomSelect from "./CustomSelect";
import IconTile from "../../common/IconTile";
import { aspectRatios, tiltDirectionArray } from "@/data/misc";
import { boxShadows } from "@/data/gradients";
import InputButton from "../../common/InputButton";
import Control from "./Control";
import PanelHeading from "./PanelHeading";
import BackgroundTile from "./BackgroundTile";
import Presets from "./Presets";
import { useAuthContext } from "@/context/User";
import { toast } from "react-hot-toast";

interface Props {}

const ControlPanel: React.FC<Props> = () => {
  const [picker, setPicker] = useState<String | null>(null);
  const [selectedOption, setSelectedOption] = useState("options");

  const {
    currentBackground: { background },
    updateBackground,
    selectedImage,
    padding,
    scale,
    borderRadius,
    canvasRoundness,
    updateData,
    currentBackgroundType,
    tilt,
    aspectRatio,
    currentBoxShadow,
    noise,
    watermark,
    left,
    right,
    rotate,
  } = useEditorContext();
  const { currentUser } = useAuthContext();

  const closePicker = () => {
    setPicker(null);
  };

  const handleRandom = () => {
    updateBackground && updateBackground(gereateRandomGradient());
    if (currentBackgroundType != BackgroundType.gradient)
      updateData &&
        updateData("currentBackgroundType", BackgroundType.gradient);
  };

  const onValueChanged = (name: string, value: string) => {
    updateData && updateData(name, Number(value));
  };

  const applyCustomBoxShadow = (value: String) => {
    if (updateData) {
      updateData("currentBoxShadow", {
        name: "custom",
        value,
      });

      closePicker();
    }
  };

  const handleCustomBackgroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      const background = {
        background: `url(${fileUrl})`,
        color1: "#242424",
        color2: "#a4a4a4",
        direction: "custom",
      };

      updateBackground && updateBackground(background);
      updateData && updateData("currentBackgroundType", BackgroundType.custom);
    }
  };

  const handleNoiseToggle = (value: boolean) => {
    updateData && updateData("noise", value);
  };

  const handleWatermarkToggle = (value: boolean) => {
    updateData &&
      updateData("watermark", {
        ...watermark,
        visible: value,
      });
  };

  const openPicker = (picker: string) => {
    setPicker((val) => (val != null ? null : picker));
  };

  const resetTransforms = () => {
    if (updateData) {
      updateData("rotate", 0);
      updateData("left", 0);
      updateData("right", 0);
      updateData("tilt", {
        name: "to center",
        value: "rotate(0)",
      });
    }
  };

  // elements
  const OptionButton = ({
    title,
    children,
  }: {
    children: ReactNode;
    title: string;
  }) => {
    const triggerValue = title.toLocaleLowerCase();
    return (
      <div
        className={`flex justify-center items-center gap-[1rem] font-medium px-3 py-2 ${
          selectedOption == triggerValue && "bg-base-100 rounded-md"
        }`}
        onClick={() => setSelectedOption(triggerValue)}
      >
        {children}
        <span className="text-primary-content">{title}</span>
      </div>
    );
  };

  const TileWrapper = ({ children }: { children: ReactNode }) => {
    return (
      <div className="grid-cols-3 gap-2 grid p-[1rem] pt-2">{children}</div>
    );
  };

  const NullScreen = () => {
    return (
      <div
        className="fixed inset-0 bg-transparent z-10"
        onClick={closePicker}
      />
    );
  };

  return (
    <section
      style={{ pointerEvents: selectedImage ? "auto" : "none" }}
      className={`flex flex-col ${
        selectedImage ? "opacity-100" : "opacity-90"
      }`}
    >
      {/* Top Buttons Container */}
      <div className="grid grid-cols-2 bg-base-200 rounded-md p-[2px] mb-3 cursor-pointer">
        <OptionButton title="Options">
          <IoMdOptions />
        </OptionButton>
        <OptionButton title="Presets">
          <BsBookmarkFill />
        </OptionButton>
      </div>

      {/* options panel wrapper */}
      {selectedOption == "options" ? (
        <div className="rounded-lg border-2 border-base-200 bg-base-100 lg:h-[calc(100vh-150px)] lg:overflow-y-scroll scrollbar-hide">
          {picker != null && <NullScreen />}
          {/* inner scrolling wrapper */}
          <div className="relative rounded-md overflow-hidden">
            <PanelHeading title="Image Options" />
            <Control
              title="Frame"
              value="macOs Light"
              onTap={() => toast("This Feature will be available soon")}
            >
              <BiChevronRight className="text-xl" />
            </Control>
            <div
              className="dropdown dropdown-end w-full"
              onClick={() => openPicker("ratio-picker")}
            >
              <Control title="Aspect Ratio" value={aspectRatio.name}>
                <BiChevronRight className="text-xl" />
              </Control>

              {picker == "ratio-picker" && (
                <CustomSelect
                  title="Select Aspect Ratio"
                  icon={<BsAspectRatio className="text-[1rem]" />}
                >
                  <TileWrapper>
                    {aspectRatios.map((ratio) => (
                      <IconTile
                        active={aspectRatio.name == ratio.name}
                        key={ratio.id}
                        title={ratio.name}
                        onTap={() => {
                          let { id, ...data } = ratio;
                          updateData && updateData("aspectRatio", data);
                        }}
                      />
                    ))}
                  </TileWrapper>
                </CustomSelect>
              )}
            </div>
            <div className="relative">
              <Control
                title="Shadow"
                value={currentBoxShadow.name}
                onTap={() => openPicker("shadow-picker")}
              >
                <BiChevronRight className="text-xl" />
              </Control>
              {picker == "shadow-picker" && (
                <CustomSelect
                  title="Select Box Shadow"
                  icon={<SiShadow className="text-[1rem]" />}
                >
                  <TileWrapper>
                    {boxShadows.map((shadow) => (
                      <IconTile
                        active={currentBoxShadow.name == shadow.name}
                        key={shadow.id}
                        title={shadow.name}
                        onTap={() => {
                          let { id, ...data } = shadow;
                          if (updateData) {
                            updateData("currentBoxShadow", data);
                            closePicker();
                          }
                        }}
                      />
                    ))}
                  </TileWrapper>
                  <InputButton
                    title="Apply Shadow"
                    onTap={applyCustomBoxShadow}
                    value={currentBoxShadow.value}
                  />
                </CustomSelect>
              )}
            </div>

            <Control title="Scale" value={scale}>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step=".05"
                className="range range-xs w-full max-w-[10rem]"
                name="scale"
                value={scale}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </Control>
            <Control title="Border Radius" value={borderRadius}>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                name="borderRadius"
                className="range range-xs w-full max-w-[10rem]"
                value={borderRadius}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </Control>
            <Control title="Padding" value={padding}>
              <input
                type="range"
                min="0"
                max="160"
                step="1"
                name="padding"
                className="range range-xs w-full max-w-[10rem]"
                value={padding}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </Control>

            <PanelHeading title="Image Transforms" />
            <Control title="Tilt">
              <div className="flex gap-1">
                {tiltDirectionArray.map((dir) => (
                  <span
                    className={`text-primary-content h-8 w-8 rounded-[4px] flex justify-center items-center border-2 border-base-200 ${
                      tilt.name == dir.name && "bg-base-200"
                    }`}
                    key={dir.id}
                    onClick={() => {
                      const { name, value } = dir;
                      updateData && updateData("tilt", { name, value });
                    }}
                  >
                    {dir.icon}
                  </span>
                ))}
              </div>
            </Control>
            <Control title="Left" value={left}>
              <input
                type="range"
                min="-100"
                max="100"
                step="5"
                name="left"
                className="range range-xs w-full max-w-[10rem]"
                value={left}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </Control>
            <Control title="Top" value={right}>
              <input
                type="range"
                min="-100"
                max="100"
                step="5"
                name="right"
                className="range range-xs w-full max-w-[10rem]"
                value={right}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </Control>
            <Control title="Rotate" value={rotate}>
              <input
                type="range"
                min="-90"
                max="90"
                step="5"
                name="rotate"
                className="range range-xs w-full max-w-[10rem]"
                value={rotate}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </Control>

            <Control title="Reset transforms" onTap={resetTransforms}>
              <BiReset className="text-xl" />
            </Control>
            <PanelHeading title="Background options" />
            <div className="relative">
              <Control
                title="Background"
                value={BackgroundType[currentBackgroundType]}
              >
                <BackgroundTile
                  background={background}
                  onTap={() => openPicker("bg-picker")}
                />
              </Control>
              {picker == "bg-picker" && (
                <>
                  <BackgroundPickerWidget closePicker={closePicker} />
                </>
              )}
            </div>
            <Control title="Roundness" value={canvasRoundness}>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                name="canvasRoundness"
                className="range range-xs w-full max-w-[10rem]"
                value={canvasRoundness}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </Control>
            <label htmlFor="custom-background">
              <Control title="Custom Background">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  id="custom-background"
                  onChange={(e) => handleCustomBackgroundChange(e)}
                />
                <BiChevronRight className="text-xl" />
              </Control>
            </label>
            <Control title="Random" onTap={() => handleRandom()}>
              <FaDice className="text-xl" />
            </Control>

            <PanelHeading title="Miscellaneous" />
            <Control title="Noise">
              <input
                type="checkbox"
                className="toggle"
                checked={noise}
                onChange={(e) => handleNoiseToggle(e.target.checked)}
              />
            </Control>
            <Control title="Watermark">
              <input
                type="checkbox"
                className="toggle"
                checked={watermark.visible}
                onChange={(e) => handleWatermarkToggle(e.target.checked)}
              />
            </Control>
          </div>
        </div>
      ) : (
        <div className="rounded-md border-2 border-base-200 bg-base-100 lg:h-[calc(100vh-150px)] lg:overflow-y-scroll scrollbar-hide">
          <PanelHeading title="Your Presets" />
          {currentUser ? (
            <Presets />
          ) : (
            <div className="h-[90px] flex items-center justify-center w-full">
              <span className="text-primary-content capitalize">
                Login in to continue
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ControlPanel;
