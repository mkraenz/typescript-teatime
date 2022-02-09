import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import React, { useEffect } from "react";

function AuthenticatedApp() {
  useEffect(() => {
    const getJwt = async () => {
      const session = await Auth.currentSession();
      const token = session.getAccessToken();
      localStorage.setItem("token", token.getJwtToken());
    };
    getJwt();
  });
  return (
    <div className="App">
      <header className="App-header">
        {/* <OrdersList /> */}
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
