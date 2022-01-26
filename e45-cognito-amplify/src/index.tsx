import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Amplify from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom";
import awsExports from "./aws-exports";
import { ExamplePriceGrid } from "./example/ExamplePriceGrid";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

Amplify.configure(awsExports);
const client = new ApolloClient({
  uri: "http://localhost:3141/graphql",
  cache: new InMemoryCache(),
});

const colors = {
  brand: {
    50: "#f1f8e9",
    100: "#dcedc8",
    200: "#c5e1a5",
    300: "#aed581",
    400: "#9ccc65",
    500: "#8bc34a",
    600: "#7cb342",
    700: "#689f38",
    800: "#558b2f",
    900: "#33691e",
  },
};

const theme = extendTheme({ colors });

ReactDOM.render(
  <React.StrictMode>
    {/* TODO move to a better place */}
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <ExamplePriceGrid />
      </ChakraProvider>
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
