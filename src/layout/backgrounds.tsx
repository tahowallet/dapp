import { green120 } from "layout/colors";

export const forestBackgroundCssFragment = `
  background: no-repeat bottom / max(100vw, 120rem) auto
      url(${require("../home/forest-background.svg")}),
    no-repeat top left / contain
      linear-gradient(
        to top,
        ${green120} -32rem,
        rgb(255 255 255 / 0.12) 0,
        rgb(255 255 255 / 0) 48rem
      );
`;
