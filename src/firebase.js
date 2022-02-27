import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.SENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore()