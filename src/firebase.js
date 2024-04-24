import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDBn3mje1Xns4iDLuxSa_DvRWbqXLT-u3A",
    authDomain: "hungrito-food.firebaseapp.com",
    projectId: "hungrito-food",
    storageBucket: "hungrito-food.appspot.com",
    messagingSenderId: "29709243667",
    appId: "1:29709243667:web:f06b1a3a7b90d6468df6e6",
    measurementId: "G-5ZTDWSVMHK"
  };

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
// const analytics = getAnalytics(app);