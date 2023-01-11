import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme(
  {
    colors: {
      //   brand: {
      //     50: "#EBFAEE",
      //     500: "#208036",
      //     700: "#153a24",
      //     900: "#153a24",
      //   },
      brand: {
        "50": "#53ea77",
        "100": "#37de5e",
        "200": "#28c54d",
        "300": "#289e43",
        "400": "#208036",
        "500": "#1f6830",
        "600": "#1d5229",
        "700": "#193e22",
        "800": "#142b1a",
        "900": "#0e1a11",
      },
      primaryText: "#f7e6dd",
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" }),
  {
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          fontFamily: "body",
          color: mode("#f7e6dd", "whiteAlpha.900")(props), // text color
          bg: mode("brand.800", "gray.800")(props),
          lineHeight: "base",
        },
      }),
    },
  }
);
