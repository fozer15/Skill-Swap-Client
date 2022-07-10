import { initializeApp } from "firebase/app";
import { getAuth, getIdToken } from "firebase/auth";
export { getAuth , getIdToken , onAuthStateChanged} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
export {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"

export const app = initializeApp({
    apiKey: "AIzaSyBE17dIUAA4BustlN4qNpjg4JEGFpA9pk4",
    authDomain: "skill-swap-387da.firebaseapp.com",
    projectId: "skill-swap-387da",
    storageBucket: "skill-swap-387da.appspot.com",
    messagingSenderId: "1087148380119",
    appId: "1:1087148380119:web:5228175293fd0d3cff8592",
    measurementId: "G-CRBYFTVQ2W",
  });
  
export const auth = getAuth(app);


onAuthStateChanged(auth, (user) => {
    if (user) {
        

    } else {
      
    }
  });


