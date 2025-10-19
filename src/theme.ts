import { createTheme } from "@mantine/core";

// Refined color palette for a more professional feel
const ariesRed = "#FF575F"; // A professional red color
const charcoal = "#1F2937"; // A deep charcoal, slightly softer than pure black
const offWhite = "#F9FAFB"; // A clean, soft white for backgrounds

export const theme = createTheme({
  fontFamily: "var(--font-inter)",
  headings: {
    fontFamily: "var(--font-lora)",
    fontWeight: "600",
  },
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      charcoal,
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
    ariesRed: [
      "#FEF2F2",
      "#FEE2E2",
      "#FECACA",
      "#FCA5A5",
      "#F87171",
      "#EF4444",
      ariesRed,
      "#B91C1C",
      "#991B1B",
      "#7F1D1D",
    ],
  },
  primaryColor: "ariesRed",
  primaryShade: 6,
  defaultRadius: "md",
  white: offWhite,
  components: {
    Button: {
      defaultProps: {
        radius: "xl",
      },
    },
    Paper: {
        defaultProps: {
            p: 'xl',
            shadow: 'sm',
            withBorder: true,
        }
    }
  },
});
