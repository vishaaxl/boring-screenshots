import { toast } from "react-hot-toast";
import domtoimage from "dom-to-image";

export const downloadimagePng = (node: HTMLDivElement | null, res: number) => {
  let savingToast = toast.loading("Saving Image, please wait");

  if (node) {
    let scale = window.devicePixelRatio * res;
    domtoimage
      .toPng(node, {
        width: node.clientWidth * scale,
        height: node.clientHeight * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
          width: node.offsetWidth + "px",
          height: node.offsetHeight + "px",
        },
      })
      .then(function (dataUrl) {
        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = `boringscreenshots-${new Date().toISOString()}.png`;
        a.click();
        toast.success("Image saved", { id: savingToast });
      })
      .catch(function () {
        toast.success("Something went wrong", { id: savingToast });
      });
  }
};

export const downloadimageJpeg = (node: HTMLDivElement | null, res: number) => {
  let savingToast = toast.loading("Saving Image, please wait");

  if (node) {
    let scale = window.devicePixelRatio * res;

    domtoimage
      .toPng(node, {
        width: node.clientWidth * scale,
        height: node.clientHeight * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
          width: node.offsetWidth + "px",
          height: node.offsetHeight + "px",
        },
      })
      .then(function (dataUrl) {
        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = `boringscreenshots-${new Date().toISOString()}.jpeg`;
        a.click();
        toast.success("Image saved", { id: savingToast });
      })
      .catch(function () {
        toast.success("Something went wrong", { id: savingToast });
      });
  }
};

export const downloadimageSvg = (node: HTMLDivElement | null, res: number) => {
  let savingToast = toast.loading("Saving Image, please wait");

  if (node) {
    let scale = window.devicePixelRatio * res;

    domtoimage
      .toPng(node, {
        width: node.clientWidth * scale,
        height: node.clientHeight * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
          width: node.offsetWidth + "px",
          height: node.offsetHeight + "px",
        },
      })
      .then(function (dataUrl) {
        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = `boringscreenshots-${new Date().toISOString()}.svg`;
        a.click();
        toast.success("Image saved", { id: savingToast });
      })
      .catch(function () {
        toast.success("Something went wrong", { id: savingToast });
      });
  }
};
