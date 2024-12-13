"use client";

import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

import { colors } from "./foundations/colors";
import { globalCss } from "./foundations/globalcss";

const custumConfig = defineConfig({
  theme: {
    tokens: {
      colors: colors,
    },
  },
  globalCss: globalCss,
});

const themeConfig = mergeConfigs(defaultConfig, custumConfig);
const themeSystem = createSystem(themeConfig);

export default themeSystem;
