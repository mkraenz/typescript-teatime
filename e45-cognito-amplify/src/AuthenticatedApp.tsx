import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import React, { useEffect } from "react";
import logo from "./logo.svg";

function AuthenticatedApp() {
  useEffect(() => {
    console.log("run getjwt");
    const getJwt = async () => {
      const session = await Auth.currentSession();
      const token = session.getAccessToken();
      const idToken = session.getIdToken();
      console.log(idToken.getJwtToken());
      console.log("ran getjwt");
    };
    getJwt();
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
