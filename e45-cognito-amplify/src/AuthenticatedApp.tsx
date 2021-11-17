import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import axios from "axios";
import React, { useEffect } from "react";
import logo from "./logo.svg";

function AuthenticatedApp() {
  useEffect(() => {
    const getJwt = async () => {
      const session = await Auth.currentSession();
      const token = session.getAccessToken();
      localStorage.setItem("token", token.getJwtToken());
    };
    getJwt();
  });
  const handleClick = async () => {
    try {
      const { data } = await axios.get("http://localhost:3141/login", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (e) {
      const error = e as any;
      if (
        error?.response?.data?.statusCode === 401 &&
        error?.response?.data?.message === "Token expired"
      ) {
        console.log("token expired. refreshing and trying again");
        const session = await Auth.currentSession();
        const token = session.getAccessToken();
        localStorage.setItem("token", token.getJwtToken());
        handleClick();
      }
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={handleClick}>Send Request</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default AuthenticatedApp;
