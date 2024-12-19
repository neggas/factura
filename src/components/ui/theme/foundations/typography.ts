import { defineTextStyles, TextStyles } from "@chakra-ui/react";

const textStyles: TextStyles = defineTextStyles({
  body: {
    value: {
      lineHeight: "20px",
      fontWeight: "400",
    },
  },
  subtitle: {
    value: {
      fontSize: "16px",
      lineHeight: "20px",
    },
  },
  caption: {
    value: {
      fontSize: "14px",
      lineHeight: "20px",
    },
  },
  small: {
    value: {
      fontSize: "12px",
      lineHeight: "20px",
    },
  },
  "heading-sm": {
    value: {
      fontSize: "20px",
      lineHeight: "150%",
      fontWeight: "semiBold",
    },
  },
  "heading-md": {
    value: {
      fontSize: "24px",
      lineHeight: "150%",
      letterSpacing: "-3px",
      fontWeight: "semiBold",
    },
  },
  "heading-lg": {
    value: {
      fontSize: "30px",
      lineHeight: "50px",
      letterSpacing: "2x",
      fontWeight: "bold",
    },
  },
});

const typography = {
  fontWeights: {
    normal: { value: 400 },
    bold: { value: 700 },
    extra: { value: 800 },
    semiBold: { value: 600 },
    black: { value: 900 },
  },
  textStyles: textStyles,
};

export default typography;
