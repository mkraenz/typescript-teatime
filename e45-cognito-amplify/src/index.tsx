import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Amplify from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import awsExports from "./aws-exports";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

Amplify.configure(awsExports);
const client = new ApolloClient({
  uri: "http://localhost:3141/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    {/* TODO move to a better place */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
