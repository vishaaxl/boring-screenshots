import { getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlCUYoxeXg4odZECDDh_n6YEnX3rpGM_c",
  authDomain: "boringscreenshots.firebaseapp.com",
  projectId: "boringscreenshots",
  storageBucket: "boringscreenshots.appspot.com",
  messagingSenderId: "792227935773",
  appId: "1:792227935773:web:d0938693ca7bcb752838f4",
  measurementId: "G-VPTPJDSKWM",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

app = getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);

// setup analytics

export { app, db, auth };
