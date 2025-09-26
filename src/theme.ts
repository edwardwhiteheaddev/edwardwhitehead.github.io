import { createTheme } from "@mantine/core";

// Refined color palette for a more professional feel
const ariesGold = "#D4AF37"; // A slightly more muted, elegant gold
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
    ariesGold: [
      "#FDF6E3",
      "#FAEEC5",
      "#F5E09C",
      "#F1D272",
      "#EDC448",
      "#E9B61E",
      ariesGold,
      "#B89A2E",
      "#9C8126",
      "#80681E",
    ],
  },
  primaryColor: "ariesGold",
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
