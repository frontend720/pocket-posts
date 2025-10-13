import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonIcon,
} from "@ionic/react";
import { ThemeContext } from "../ThemeContext.jsx";
import { sunny, moon } from "ionicons/icons";

import { useContext } from "react";
import "./Settings.css";
import { AuthenticationContext } from "../AuthenticationContext.jsx";
import { FirebaseContext } from "../FirebaseContext.jsx";

const Settings = () => {
  const { onThemeChange, theme } = useContext(ThemeContext);
  const { logout, emailReference } = useContext(AuthenticationContext);
  const {clearCollection} = useContext(FirebaseContext)

  function logoutFunction(){
    logout()
    clearCollection()

  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={theme ? "content-dark" : "content-light"}>
          <IonTitle style={theme ? { color: "#444444" } : { color: "#dadada" }}>
            Account
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className={theme ? "content-dark" : "content-light"}
        fullscreen
      >
        <IonHeader collapse="condense">
          <IonToolbar className={theme ? "content-dark" : "content-light"}>
            <IonTitle
              style={theme ? { color: "#444444" } : { color: "#dadada" }}
              size="large"
            >
              Account
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="account-container">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            {theme ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 10,
                  color: "#222222",
                }}
              >
                <IonIcon color="#222222" icon={sunny} />
                <IonLabel color="#222222" style={{ marginLeft: 10 }}>
                  Light Theme
                </IonLabel>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 10,
                  color: "#dadada",
                }}
              >
                <IonIcon color="#dadada" icon={moon} />
                <IonLabel style={{ marginLeft: 10, color: "#dadada" }}>
                  Dark Theme
                </IonLabel>
              </div>
            )}
          </div>
          <IonSegment
            style={{ background: "#222222" }}
            onClick={onThemeChange}
            value={theme}
          >
            <IonSegmentButton style={{ background: "#222222" }} value={true}>
              <IonLabel
                style={theme ? { color: "#444444" } : { color: "#dadada" }}
              >
                Light
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value={false}>
              <IonLabel
                style={theme ? { color: "#dadada" } : { color: "#444444" }}
              >
                Dark
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
            <div style={{display: "flex", flexDirection: "column"}}>

        <button
          style={
            theme
              ? {
                  padding: 8,
                  marginLeft: 24,
                  borderRadius: 10,
                  fontSize: 16,
                  width: 178,
                  background: "#222222",
                  color: "#dadada",
                }
              : {
                  padding: 8,
                  marginLeft: 24,
                  borderRadius: 10,
                  fontSize: 16,
                  width: 178,
                  color: "#222222",
                  background: "#dadada"
                }
          }
          onClick={logoutFunction}
        >
          Logout
        </button>
        <label style={ theme ? {marginLeft: 24, marginTop: 24, fontWeight: 800, color: "#222222"} : {marginLeft: 24, marginTop: 24, fontWeight: 800, color: "#dadada"}} htmlFor="">

        {emailReference}
        </label>
            </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
