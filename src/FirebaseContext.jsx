import { createContext, useState, useEffect, useContext } from "react";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  where,
  query
} from "firebase/firestore";
import { db } from "./config";
import { v4 as uuidv4 } from "uuid";
import { AuthenticationContext } from "./AuthenticationContext";

const FirebaseContext = createContext();

function FirebaseContextProvider({ children }) {
  const { emailReference } = useContext(AuthenticationContext);
  const [collectionArr, setCollectionArr] = useState([]);
  const [response, setResponse] = useState();
  const [deletedDoc, setDeletedDoc] = useState()
  function savedVideo(post, username) {
    const now = new Date();
    setDoc(doc(db, emailReference, uuidv4()), {
      post: post,
      username: username,
      timestamp: now.getTime(),
    })
      .then((response) => {
        setResponse(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.code);
      });
  }

  function clearCollection() {
    setCollectionArr([]);
  }

  // console.log(response)

  const getMedia = async () => {
    const documents = [];
    try {
      const querySnapshot = await getDocs(collection(db, emailReference));
      querySnapshot.forEach((doc) => {
        documents.push(doc.data());
      });
      setCollectionArr(documents);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

function deleteMedia(timestamp) {
  const collectionRef = collection(db, emailReference);
  const q = query(collectionRef, where('timestamp', '==', timestamp));

  getDocs(q)
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No matching documents found to delete.');
        return;
      }
      querySnapshot.forEach((documentSnapshot) => {
        console.log(`Found document ${documentSnapshot.id}, deleting...`);
        deleteDoc(documentSnapshot.ref)
          .then(() => {
            setDeletedDoc('Document successfully deleted! ✅');
          })
          .catch((error) => {
            console.error('Error deleting sub-document: ', error);
          });
      });
    })
    .catch((error) => {
      console.error('Error finding document to delete: ', error);
    });
}
  return (
    <FirebaseContext.Provider
      value={{
        savedVideo,
        collectionArr,
        getMedia,
        clearCollection,
        deleteMedia,
        deletedDoc
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseContextProvider };
