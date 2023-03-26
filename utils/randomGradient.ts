import { directionArray } from "@/data/misc";

const randomHex = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const randomDirection = () => {
  let random = Math.floor(Math.random() * directionArray.length);
  return directionArray[random].name;
};

export const gereateRandomGradient = () => {
  let color1 = randomHex(),
    color2 = randomHex(),
    color3 = randomHex(),
    direction = randomDirection();

  return {
    color1,
    color2,
    background: `linear-gradient(${direction}, ${color1}, ${color2}, ${color3})`,
    direction,
  };
};
