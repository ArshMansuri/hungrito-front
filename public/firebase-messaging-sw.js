importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDBn3mje1Xns4iDLuxSa_DvRWbqXLT-u3A",
  authDomain: "hungrito-food.firebaseapp.com",
  projectId: "hungrito-food",
  storageBucket: "hungrito-food.appspot.com",
  messagingSenderId: "29709243667",
  appId: "1:29709243667:web:f06b1a3a7b90d6468df6e6",
  measurementId: "G-5ZTDWSVMHK",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
