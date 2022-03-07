import { hunterGreen, trophyGold } from "layout/colors";
import { quincyTextFontFamily } from "layout/fonts";

export const ghostButtonCssFragment = `
  border: 1px solid ${trophyGold};
  border-radius: 2rem;
  padding: 0.75rem 1.5rem;
  font-family: ${quincyTextFontFamily};
  font-size: 18px;
  text-decoration: none;
  color: ${trophyGold};

  &:hover {
    background-color: ${trophyGold};
    color: ${hunterGreen};
    cursor: pointer;
  }
`;
