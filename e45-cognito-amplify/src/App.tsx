import {
  AmplifyAuthContainer,
  AmplifyAuthenticator,
  AmplifyForgotPassword,
  AmplifySignIn,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import React from "react";
import "./App.css";
import AuthenticatedApp from "./AuthenticatedApp";

function App() {
  return (
    <AmplifyAuthContainer>
      <AmplifyAuthenticator>
        <AmplifySignIn slot="sign-in" usernameAlias="email" />
        <AmplifyForgotPassword slot="forgot-password" usernameAlias="email" />
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            {
              type: "email",
              inputProps: {
                required: true,
                autocomplete: "email",
              },
            },
            {
              type: "password",
              inputProps: {
                required: true,
                autocomplete: "password",
              },
            },
          ]}
        ></AmplifySignUp>
        <AuthenticatedApp />
      </AmplifyAuthenticator>
    </AmplifyAuthContainer>
  );
}

export default App;
