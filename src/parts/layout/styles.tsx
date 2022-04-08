import * as backgrounds from "parts/layout/backgrounds";
import {
  canvas,
  hunterGreen,
  textCanvas20,
  textGreen40,
  trophyGold,
  trophyGold120,
} from "parts/layout/colors";
import { quincyRegularFontFamily, segmentFontFamily } from "parts/layout/fonts";

/* Hack Prettier into formatting CSS fragments as such. */
export const styled = { fragment: String.raw };

export const titleDarkColor = styled.fragment`
  color: ${hunterGreen};
`;

export const titleGoldColor = styled.fragment`
  color: ${trophyGold};
`;

export const titleLightColor = styled.fragment`
  color: ${canvas};
`;

export const bodyDarkColor = styled.fragment`
  color: ${textCanvas20};
`;

export const bodyGoldColor = styled.fragment`
  color: ${trophyGold120};
`;

export const bodyLightColor = styled.fragment`
  color: ${textGreen40};
`;

export const lightFadeBackground = styled.fragment`
  background: ${backgrounds.lightFade};
`;

export const buttonLayout = styled.fragment`
  padding: 12px 32px;
  border-radius: 24px;
`;

export const pillLayout = styled.fragment`
  padding: 4px 24px;
  border-radius: 24px;
`;

export const sectionWideLayout = styled.fragment`
  max-width: 80rem;
  padding-inline: 2rem;
  margin-inline: auto;
`;

export const sectionNarrowLayout = styled.fragment`
  max-width: 60rem;
  padding-inline: 2rem;
  margin-inline: auto;
`;

export const textLayout = styled.fragment`
  max-width: 48rem;
  margin-inline: auto;
`;

export const tileLayout = styled.fragment`
  border-radius: 16px;
`;

export const tileShadow = styled.fragment`
  box-shadow: 10px 108px 168px rgba(182, 121, 43, 0.15),
    10px 44px 200px rgba(182, 121, 43, 0.1),
    10px 48px 64px rgba(182, 121, 43, 0.04);
`;

export const tileLowShadow = styled.fragment`
  box-shadow: 0px 16px 16px rgba(182, 121, 43, 0.04),
    0px 6px 8px rgba(182, 121, 43, 0.14), 0px 2px 4px rgba(182, 121, 43, 0.24);
`;

export const tileHighShadow = styled.fragment`
  box-shadow: 0px 6px 22px rgba(182, 121, 43, 0.5);
`;

export const tileLightBackground = styled.fragment`
  background: ${backgrounds.tile};
`;

export const tileDarkBackground = styled.fragment`
  background: ${backgrounds.darkTile};
`;

export const buttonShadow = styled.fragment`
  box-shadow: 0px 6px 22px #b8d1d0;
`;

export const bodyFont = styled.fragment`
  font: 400 24px / 1.33 ${segmentFontFamily};
`;

export const title1Font = styled.fragment`
  font: 400 80px / 1.1 ${quincyRegularFontFamily};
`;

export const title2Font = styled.fragment`
  font: 400 72px / 1.1 ${quincyRegularFontFamily};
`;

export const title3Font = styled.fragment`
  font: 400 48px / 1.1 ${quincyRegularFontFamily};
`;

export const title4Font = styled.fragment`
  font: 400 36px / 1.1 ${quincyRegularFontFamily};
`;

export const showcaseFont = styled.fragment`
  font: 400 144px / 1.1 ${quincyRegularFontFamily};
`;

export const buttonFont = styled.fragment`
  font: 700 18px / 1 ${quincyRegularFontFamily};
  letter-spacing: 0.02em;
`;

export const pillFont = styled.fragment`
  font: 400 14px / 1.33 ${segmentFontFamily};
  letter-spacing: 0.02em;
`;

export const darkTextContainer = styled.fragment`
  ${bodyDarkColor}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${titleDarkColor}
  }
`;

export const goldDarkTextContainer = styled.fragment`
  ${bodyDarkColor}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${titleGoldColor}
  }
`;

export const darkGoldTextContainer = styled.fragment`
  ${bodyGoldColor}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${titleDarkColor}
  }
`;

export const lightTextContainer = styled.fragment`
  ${bodyLightColor}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${titleLightColor}
  }
`;
