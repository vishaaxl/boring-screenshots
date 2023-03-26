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
    id: 0,
    name: "Auto",
    value: "auto",
  },
  {
    id: 1,
    name: "Twitter",
    value: "16 / 9",
  },
  {
    id: 2,
    name: "Instagram",
    value: "4 / 5",
  },
  {
    id: 3,
    name: "Dribbble",
    value: "4 / 3",
  },
  {
    id: 4,
    name: "Story",
    value: "9 / 16",
  },
  {
    id: 6,
    name: "Pinterest",
    value: "2 / 3",
  },

  {
    id: 5,
    name: "Square (1:1)",
    value: "1 / 1",
  },
  {
    id: 5,
    name: "Wide (16:9)",
    value: "16 / 9",
  },
];

export const directionArray = [
  {
    id: 4,
    name: "to top",
    icon: <BsArrowUp className="direction-icon" />,
  },
  {
    id: 0,
    name: "to bottom",
    icon: <BsArrowDown className="direction-icon" />,
  },
  {
    id: 6,
    name: "to left",
    icon: <BsArrowLeft className="direction-icon" />,
  },
  {
    id: 2,
    name: "to right",
    icon: <BsArrowRight className="direction-icon" />,
  },
  {
    id: 1,
    name: "to bottom right",
    icon: <BsArrowDownRight className="direction-icon" />,
  },

  {
    id: 3,
    name: "to top right",
    icon: <BsArrowUpRight className="direction-icon" />,
  },
];

export const tiltDirectionArray = [
  {
    id: 10,
    name: "to top",
    value: "rotateX(20deg)",
    icon: <BsArrowUp className="direction-icon" />,
  },
  {
    id: 11,
    name: "to bottom",
    value: "rotateX(-20deg)",
    icon: <BsArrowDown className="direction-icon" />,
  },
  {
    id: 12,
    name: "to center",
    value: "rotate(0)",
    icon: <BsArrowsFullscreen className="direction-icon" />,
  },
  {
    id: 13,
    name: "to left",
    value: "rotateY(-20deg)",
    icon: <BsArrowLeft className="direction-icon" />,
  },
  {
    id: 14,
    name: "to right",
    value: "rotateY(20deg)",
    icon: <BsArrowRight className="direction-icon" />,
  },
];
