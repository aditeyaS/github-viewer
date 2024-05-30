import ghc from "../config/gitHubColors.json";
// The above json comes from:
// https://github.com/ozh/github-colors/blob/master/colors.json
// Updated on: May 30, 2024

interface GitHubColorInfo {
  color: string | null;
  url: string;
}

interface GitHubColors {
  [key: string]: GitHubColorInfo;
}

const gitHubColors: GitHubColors = ghc;

const getLanguageColor = (language: string | undefined) => {
  let color = "#EDEDED";
  if (language && language in gitHubColors) {
    color = gitHubColors[language].color || color;
  }
  return color;
};

export default getLanguageColor;
