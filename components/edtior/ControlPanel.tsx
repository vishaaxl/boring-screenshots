import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { BiChevronRight } from "react-icons/bi";
import { BsAspectRatio, BsBookmarkFill } from "react-icons/bs";
import { SiShadow } from "react-icons/si";
import { FaDice } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";

// local
import BackgroundPickerWidget, { BackgroundTile } from "./BackgroundPicker";
import { useEditorContext } from "@/context/Editor";
import { BackgroundType } from "@/interface";
import { gereateRandomGradient } from "@/utils/randomGradient";

import CustomSelect from "./CustomSelect";
import IconTile from "../common/IconTile";
import { aspectRatios, tiltDirectionArray } from "@/data/misc";
import { boxShadows } from "@/data/gradients";
import InputButton from "../common/InputButton";
import Swatch from "../common/Swatch";

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const PanelWrapper = styled.section`
  background: ${({ theme }) => theme.foreground};
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.light};

  @media (min-width: 900px) {
    max-height: calc(100vh - 150px);
    overflow: scroll;
  }
`;

const InnerContainer = styled.div``;

const PanelHeading = styled.h2`
  background: ${({ theme }) => theme.light};
  padding: 0.5rem;
  text-align: center;
  font-weight: 500;
  font-size: 0.8rem;
`;

const OptionLine = styled.div`
  position: relative;
  font-size: 0.9rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.light};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.extraLight};
  }

  .option-heading {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 500;

    .value {
      padding: 0.25rem 0.5rem;
      background: ${({ theme }) => theme.light};
      font-size: 0.615rem;
      font-weight: 500;
      border-radius: 5px;
    }
  }

  .icon {
    font-size: 1.25rem;
  }

  input[type="range"] {
    width: 100%;
    max-width: 10rem;
  }
`;

const NullScreen = styled.div`
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 10;
`;

const TiltRow = styled.div`
  display: flex;
  gap: 0.25rem;
  span {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
    border-radius: 4px;
    border: 2px solid ${({ theme }) => theme.light};

    &:hover {
      background: ${({ theme }) => theme.light};
    }
  }

  .active-direction {
    background: ${({ theme }) => theme.light};
  }
`;

const TileWrapper = styled.div`
  padding: 0.5rem 1rem 1rem 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const OptionSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: ${({ theme }) => theme.light};
  border-radius: 5px;
  padding: 0.125rem;
  margin-bottom: 0.75rem;

  div {
    cursor: pointer;
    text-align: center;
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 0.5rem 0.75rem;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .active {
    border-radius: 5px;
    background: ${({ theme }) => theme.foreground};
  }
`;

interface Props {}

const ControlPanel: React.FC<Props> = () => {
  const [picker, setPicker] = useState<String | null>(null);
  const [selectedOption, setSelectedOption] = useState("options");

  const {
    currentBackground: { background },
    updateBackground,
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
  } = useEditorContext();

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

  return (
    <MainWrapper>
      <OptionSelector>
        <div
          className={selectedOption == "options" ? "active" : "in-active"}
          onClick={() => setSelectedOption("options")}
        >
          <IoMdOptions />
          <span>Options</span>
        </div>
        <div
          className={selectedOption == "presets" ? "active" : "in-active"}
          onClick={() => setSelectedOption("presets")}
        >
          <BsBookmarkFill />
          <span>Presets</span>
        </div>
      </OptionSelector>
      {selectedOption == "options" ? (
        <PanelWrapper>
          {picker != null && <NullScreen onClick={() => closePicker()} />}
          <InnerContainer>
            <PanelHeading>Image Options</PanelHeading>
            <OptionLine>
              <div className="option-heading">
                <span>Frame</span>
                <span className="value">macOS Light</span>
              </div>
              <BiChevronRight className="icon" />
            </OptionLine>
            <OptionLine
              onClick={() =>
                setPicker((val) => (val != null ? null : "ratio-picker"))
              }
            >
              <div className="option-heading">
                <span>Aspect Ratio</span>
                <span className="value">{aspectRatio.name}</span>
              </div>
              <BiChevronRight className="icon" />
              {picker == "ratio-picker" && (
                <>
                  <CustomSelect
                    title="Select Aspect Ratio"
                    icon={<BsAspectRatio className="icon" />}
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
                </>
              )}
            </OptionLine>
            <OptionLine>
              <div className="option-heading">
                <span>Scale</span>
                <span className="value">{scale}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step=".05"
                className="slider"
                name="scale"
                value={scale}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </OptionLine>
            <OptionLine>
              <div className="option-heading">
                <span>Border Radius</span>
                <span className="value">{borderRadius}</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                name="borderRadius"
                className="slider"
                value={borderRadius}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </OptionLine>
            <OptionLine>
              <div className="option-heading">
                <span>Padding</span>
                <span className="value">{padding}</span>
              </div>
              <input
                type="range"
                min="0"
                max="160"
                step="1"
                name="padding"
                className="slider"
                value={padding}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </OptionLine>
            <OptionLine>
              <div
                className="option-heading"
                onClick={() =>
                  setPicker((val) => (val != null ? null : "shadow-picker"))
                }
              >
                <span>Shadow</span>
                <span className="value">{currentBoxShadow.name}</span>
              </div>
              <BiChevronRight
                className="icon"
                onClick={() =>
                  setPicker((val) => (val != null ? null : "shadow-picker"))
                }
              />
              {picker == "shadow-picker" && (
                <CustomSelect
                  title="Select Box Shadow"
                  icon={<SiShadow className="icon" />}
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
            </OptionLine>
            <OptionLine>
              <div className="option-heading">
                <span>Tilt</span>
              </div>
              <TiltRow>
                {tiltDirectionArray.map((dir) => (
                  <span
                    className={`icon-wrapper ${
                      tilt.name == dir.name && "active-direction"
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
              </TiltRow>
            </OptionLine>
            <PanelHeading>Background options</PanelHeading>
            <OptionLine>
              <div className="option-heading">
                <span>Background</span>
                <span className="value">
                  {BackgroundType[currentBackgroundType]}
                </span>
              </div>
              <BackgroundTile
                data={background}
                onClick={() =>
                  setPicker((val) => (val != null ? null : "bg-picker"))
                }
              />
              {picker == "bg-picker" && (
                <>
                  <BackgroundPickerWidget closePicker={closePicker} />
                </>
              )}
            </OptionLine>
            <OptionLine>
              <div className="option-heading">
                <span>Roundness</span>
                <span className="value">{canvasRoundness}</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                name="canvasRoundness"
                className="slider"
                value={canvasRoundness}
                onChange={(e) => onValueChanged(e.target.name, e.target.value)}
              />
            </OptionLine>
            <label htmlFor="custom-background">
              <OptionLine>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  id="custom-background"
                  onChange={(e) => handleCustomBackgroundChange(e)}
                />
                <div className="option-heading">
                  <span>Custom Background</span>
                </div>
                <BiChevronRight className="icon" />
              </OptionLine>
            </label>
            <OptionLine onClick={() => handleRandom()}>
              <div className="option-heading">
                <span>Random Background</span>
              </div>
              <FaDice className="icon" />
            </OptionLine>

            <PanelHeading>Miscellaneous</PanelHeading>
            <OptionLine>
              <div className="option-heading">
                <span>Watermark</span>
              </div>
              <Swatch
                checked={watermark.visible}
                onTap={handleWatermarkToggle}
              />
            </OptionLine>
            <OptionLine>
              <div className="option-heading">
                <span>Noise</span>
              </div>
              <Swatch checked={noise} onTap={handleNoiseToggle} />
            </OptionLine>
          </InnerContainer>
        </PanelWrapper>
      ) : null}
    </MainWrapper>
  );
};

export default ControlPanel;
