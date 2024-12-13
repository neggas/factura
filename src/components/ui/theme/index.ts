"use client";

import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

import { colors } from "./foundations/colors";
import { globalCss } from "./foundations/globalcss";
import typography from "./foundations/typography";

const custumConfig = defineConfig({
  theme: {
    tokens: {
      colors: colors,
      fonts: {
        body: { value: "'Roboto',sans-serif" },
      },
      fontWeights: typography.fontWeights,
    },
    textStyles: typography.textStyles,
  },
  globalCss: globalCss,
});

const themeConfig = mergeConfigs(defaultConfig, custumConfig);
const themeSystem = createSystem(themeConfig);

export default themeSystem;
