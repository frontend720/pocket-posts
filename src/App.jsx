import { Redirect, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./ThemeContext.jsx";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  home,
  square,
  triangle,
  bookmark,
  settings,
} from "ionicons/icons";
import Feed from "./pages/Feed.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";
import Settings from "./pages/Settings.jsx";
import Authentication from "./Authentication.jsx";
import { StatusBar } from "@capacitor/status-bar";
import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import { AuthenticationContext } from "./AuthenticationContext.jsx";
import ExploreContainer from "./components/ExploreContainer.tsx"

setupIonicReact();

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { auth_id } = useContext(AuthenticationContext);

  return (
    <>
      {auth_id === null ? (
        <Authentication />
      ) : (
        <IonApp>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/feed">
                  <Feed />
                </Route>
                <Route exact path="/bookmarks">
                  <Bookmarks />
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
                <Route exact path="/">
                  <Redirect to="/feed" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar
                className={theme ? "tab-bar-dark" : "tab-bar-light"}
                slot="bottom"
              >
                <IonTabButton
                  style={{ background: "red !important" }}
                  tab="feed"
                  href="/feed"
                >
                  <IonIcon aria-hidden="true" icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="bookmarks" href="/bookmarks">
                  <IonIcon aria-hidden="true" icon={bookmark} />
                  <IonLabel>Saves</IonLabel>
                </IonTabButton>
                <IonTabButton tab="settings" href="/settings">
                  <IonIcon aria-hidden="true" icon={settings} />
                  <IonLabel>Account</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonApp>
      )}
    </>
  );
};

export default App;
