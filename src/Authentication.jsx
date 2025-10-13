import React, { useContext, useState } from "react";
import { IonPage } from "@ionic/react";
import { AuthenticationContext } from "./AuthenticationContext";
import {
  AuthenticationButton,
  AuthenticationInput,
  AuthenticationForm,
} from "./StyleSheet";
import "./Authentication.css"

export default function Authentication() {
  const [togglePasswordVisibility, setTogglePasswordVisibility] =
    useState(false);
  const [authType, setAuthType] = useState(false);

  function onPasswordVisibilityToggle() {
    setTogglePasswordVisibility((prev) => !prev);
  }
  function onAuthType(e) {
    e.preventDefault();
    setAuthType((prev) => !prev);
  }

  const {
    createUser,
    returningUser,
    onEmailChange,
    onPasswordChange,
    email,
    password,
    resetEmail,
    error
  } = useContext(AuthenticationContext);
//   console.log(email, password);
  return (
    <IonPage>
      <div style={{paddingTop: 100, background: "#1f2627ff", height: "100vh"}}>
        <AuthenticationForm
          onSubmit={!authType === false ? createUser : returningUser}
          action=""
        >
            <h1 className="authentication-title">Pocket Posts</h1>
          <AuthenticationInput
            name="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Email"
            type="email"
          />
          <AuthenticationInput
            name="password"
            value={password}
            onChange={onPasswordChange}
            type={togglePasswordVisibility ? "text" : "password"}
            placeholder="Password"
          />
          <label
            onClick={onPasswordVisibilityToggle}
            style={{ textAlign: "right", color: "#dadada" }}
            htmlFor=""
          >
            {togglePasswordVisibility ? "Hide" : "Show"} Password
          </label>
          <AuthenticationButton type="submit">
            {!authType ? "Login" : "Signup"}
          </AuthenticationButton>
        </AuthenticationForm>
        <button
          style={{
            fontSize: 18,
            fontWeight: 800,
            background: "transparent",
            width: "100%",
            color: "#dadada"
          }}
          onClick={onAuthType}
        >
          {!authType ? "Signup here" : "Login Here"}
        </button>
        <div>

        </div>
        <div style={{display: "flex", flexDirection: "column", marginTop: 30, alignItems: "center"}}>

        <label style={{textAlign: "center", color: "#dadada"}} htmlFor="">

        {error}
        </label>
        {/* <button onClick={resetEmail}>Reset Password</button> */}
        <form  style={error === "Incorrect email or password. Please try again." || error ===  "That email is already in use. Try another or Reset Password?" ? {display: "", width: 200} : {display: "none"}} onSubmit={resetEmail} action="">
          {/* <input type="text" onChange={onEmailChange} value={email} />
        <button className="reset-auth-button">Reset Password</button> */}
        </form>
        </div>
      </div>
    </IonPage>
  );
}
