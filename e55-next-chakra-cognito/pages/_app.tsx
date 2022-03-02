import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import Amplify from "aws-amplify";
import type { AppProps } from "next/app";
import awsExports from "../src/aws-exports";
import "../styles/globals.css";

Amplify.configure({ ...awsExports, ssr: true });
const client = new ApolloClient({
  uri: "http://localhost:3141/graphql",
  cache: new InMemoryCache(),
});

const colors = {
  // brand: {
  //   50: "#f1f8e9",
  //   100: "#dcedc8",
  //   200: "#c5e1a5",
  //   300: "#aed581",
  //   400: "#9ccc65",
  //   500: "#8bc34a",
  //   600: "#7cb342",
  //   700: "#689f38",
  //   800: "#558b2f",
  //   900: "#33691e",
  // },
  brand: {
    50: "#eefae3",
    100: "#d6ecc2",
    200: "#bcde9f",
    300: "#a2d17a",
    400: "#89c355",
    500: "#6faa3c",
    600: "#55842d",
    700: "#3d5e1f",
    800: "#233a10",
    900: "#061500",
  },
};
const theme = extendTheme(
  { colors, config: { cssVarPrefix: "tstt" } },
  withDefaultColorScheme({ colorScheme: "brand" })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
