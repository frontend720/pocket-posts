import React from "react";
import { createRoot } from "react-dom/client";
import { FirebaseContextProvider } from "./FirebaseContext";
import { TwitterContextProvider } from "./TwitterContext";
import { ThemeContextProvider } from "./ThemeContext";
import { AuthenticationContextProvider } from "./AuthenticationContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <ThemeContextProvider>
        <FirebaseContextProvider>
          <TwitterContextProvider>
            <App />
          </TwitterContextProvider>
        </FirebaseContextProvider>
      </ThemeContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
);
