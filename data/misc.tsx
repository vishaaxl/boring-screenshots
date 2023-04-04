import {
  BsArrowDown,
  BsArrowDownRight,
  BsArrowLeft,
  BsArrowRight,
  BsArrowsFullscreen,
  BsArrowUp,
  BsArrowUpRight,
} from "react-icons/bs";

export const aspectRatios = [
  {
    id: 40,
    name: "Auto",
    value: "auto",
  },
  {
    id: 41,
    name: "Twitter",
    value: "16 / 9",
  },
  {
    id: 42,
    name: "Instagram",
    value: "4 / 5",
  },
  {
    id: 43,
    name: "Dribbble",
    value: "4 / 3",
  },
  {
    id: 44,
    name: "Story",
    value: "9 / 16",
  },
  {
    id: 46,
    name: "Pinterest",
    value: "2 / 3",
  },

  {
    id: 45,
    name: "Square (1:1)",
    value: "1 / 1",
  },
  {
    id: 45,
    name: "Wide (16:9)",
    value: "16 / 9",
  },
];

export const directionArray = [
  {
    id: 54,
    name: "to top",
    icon: <BsArrowUp className="direction-icon" />,
  },
  {
    id: 50,
    name: "to bottom",
    icon: <BsArrowDown className="direction-icon" />,
  },
  {
    id: 56,
    name: "to left",
    icon: <BsArrowLeft className="direction-icon" />,
  },
  {
    id: 52,
    name: "to right",
    icon: <BsArrowRight className="direction-icon" />,
  },
  {
    id: 51,
    name: "to bottom right",
    icon: <BsArrowDownRight className="direction-icon" />,
  },

  {
    id: 53,
    name: "to top right",
    icon: <BsArrowUpRight className="direction-icon" />,
  },
];

export const tiltDirectionArray = [
  {
    id: 60,
    name: "to top",
    value: "rotateX(20deg)",
    icon: <BsArrowUp className="direction-icon" />,
  },
  {
    id: 61,
    name: "to bottom",
    value: "rotateX(-20deg)",
    icon: <BsArrowDown className="direction-icon" />,
  },
  {
    id: 62,
    name: "to center",
    value: "rotate(0)",
    icon: <BsArrowsFullscreen className="direction-icon" />,
  },
  {
    id: 63,
    name: "to left",
    value: "rotateY(-20deg)",
    icon: <BsArrowLeft className="direction-icon" />,
  },
  {
    id: 64,
    name: "to right",
    value: "rotateY(20deg)",
    icon: <BsArrowRight className="direction-icon" />,
  },
];
