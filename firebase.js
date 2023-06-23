// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo6EG7ENzHxbjGjMSonOHSEyA_23SJ1_E",
  authDomain: "fb-clone-yt-54f6d.firebaseapp.com",
  projectId: "fb-clone-yt-54f6d",
  storageBucket: "fb-clone-yt-54f6d.appspot.com",
  messagingSenderId: "211393823331",
  appId: "1:211393823331:web:1ab8dba9ccc7566e796e56"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };