import {
  BackgroundType,
  EditorProps,
  GradientProps,
  PresetProps,
} from "@/interface";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const defaultValue = {
  currentBackgroundType: BackgroundType.solid,
  selectedImage: null,
  currentBackground: {
    color1: "#F5E6E8",
    color2: "#F5E6E8",
    direction: "to right",
    background: "linear-gradient(to right, #F5E6E8, #F5E6E8)",
  },
  scale: 1,
  borderRadius: 5,
  canvasRoundness: 0,
  padding: 64,
  left: 0,
  right: 0,
  rotate: 0,
  tilt: {
    name: "to center",
    value: "rotate(0)",
  },
  aspectRatio: {
    name: "Auto",
    value: "auto",
  },
  currentBoxShadow: {
    name: "None",
    value: "none",
  },
  noise: true,
  watermark: {
    visible: false,
    value: "👏 your watermark",
  },
};

const EditorContext = createContext<EditorProps>(defaultValue);

const EditorContextProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<EditorProps>(defaultValue);

  const updateBackground = (value: GradientProps) => {
    setData((prev) => ({ ...prev, currentBackground: value }));
  };

  const resetChanges = () => {
    setData(defaultValue);
  };

  const updateData = (name: string, value: any) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const getCurrentPreset = () => {
    return data;
  };

  const updatePreset = (data: PresetProps) => {
    setData((prev) => ({ selectedImage: prev.selectedImage, ...data }));
  };

  return (
    <EditorContext.Provider
      value={{
        ...data,
        updateData,
        updatePreset,
        updateBackground,
        resetChanges,
        getCurrentPreset,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// Here we create a custom hook that allows us to consume
// the todo context
function useEditorContext() {
  return useContext(EditorContext);
}

export { EditorContextProvider, useEditorContext };
