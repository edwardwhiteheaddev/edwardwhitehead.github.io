import { createTheme } from "@mantine/core";

// Approximated colors from the LinkedIn banner
const ariesGold = "#FAB005"; // Golden yellow for highlights
const charcoal = "#25262B"; // Dark gray for text and primary elements

export const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: "Verdana, sans-serif",
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      charcoal, // main dark color
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
    ariesGold: [
      "#FFF9E6",
      "#FFF0CC",
      "#FFE099",
      "#FFD166",
      "#FFC133",
      "#FFB81A",
      ariesGold, // main accent color
      "#E09B00",
      "#C78800",
      "#AD7500",
    ],
  },
  primaryColor: "ariesGold",
  primaryShade: 6,
  headings: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "700",
  },
});
