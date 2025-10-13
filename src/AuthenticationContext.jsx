import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseContext } from "./FirebaseContext";

const AuthenticationContext = createContext();

function AuthenticationContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("")

  function resetEmail(e) {
    let passwordRef = email 
    console.log(passwordRef)
    e.preventDefault()
    const resetUserReference = sendPasswordResetEmail(auth, "frontend720@gmail.com");
    resetUserReference
      .then((response) => {
        console.log(response);
        console.log("An email has been sent")
        setError("")
      })
      .catch((error) => {
        console.log(error.code);
      });
  }

  function createUser(e) {
    e.preventDefault();
    const createUserRef = createUserWithEmailAndPassword(auth, email, password);
    createUserRef
      .then((response) => {
        console.log(response.user.email);
        setError("")
      })
      .catch((error) => {
        console.log(error);
        if(error.code === "auth/email-already-in-use"){
            setError("That email is already in use. Try again.")
        }else if(error.code === "auth/weak-password"){
            setError("Please choose a stronger password. It must be at least 6 characters long.")
        }
      });
  }

  function returningUser(e) {
    e.preventDefault();
    const returningUserRef = signInWithEmailAndPassword(auth, email, password);
    returningUserRef
      .then((response) => {
        console.log(response.user.email);
      })
      .catch((error) => {
        console.log(error.code);
            if(error.code === "auth/invalid-email"){
            setError("Please enter a valid email address.")
        }else if(error.code === "auth/wrong-password"){
            setError("Incorrect email or password. Please try again.")
        }else if(error.code === "auth/user-not-found"){
            setError("Please sign up for an account or check your spelling and try again.")
        }
      });
  }

  function logout() {
    signOut(auth)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  const [auth_id, set_auth_id] = useState(null);
  const [emailReference, setEmailReference] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      set_auth_id(user);
      setEmailReference(user?.email);
    });
  }, []);
//   console.log(resetMessage);
  return (
    <AuthenticationContext.Provider
      value={{
        createUser,
        returningUser,
        auth_id,
        onEmailChange,
        onPasswordChange,
        email,
        password,
        logout,
        emailReference,
        resetEmail,
        error
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationContext, AuthenticationContextProvider };
