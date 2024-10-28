import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsUNwnDNWYL_y0ZBiBkvgVeytRxrvKnrQ",
  authDomain: "projekt-80ef3.firebaseapp.com",
  projectId: "projekt-80ef3",
  storageBucket: "projekt-80ef3.appspot.com",
  messagingSenderId: "678516843181",
  appId: "1:678516843181:web:d945cf8467c26ceb139c24"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);  
export { db, auth, storage };