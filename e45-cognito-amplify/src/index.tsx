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
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
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
