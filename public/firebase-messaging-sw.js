// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

//@ts-ignore
importScripts("https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js");
//@ts-ignore
importScripts(
  "https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCp-8PCL9NbEcQmT1IZpcsIR7oXuc7pw8s",
  authDomain: "irricontrol-dev.firebaseapp.com",
  projectId: "irricontrol-dev",
  storageBucket: "irricontrol-dev.appspot.com",
  messagingSenderId: "634355703554",
  appId: "1:634355703554:web:b27f1b5c042a114a162c1b",
  measurementId: "G-DY4KT9WKWC",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

//Mapa com os timestamps das notificações para eu saber onde eu devo navegar
let notificationNavigationMap = {};

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here

  let { title, body, image } = payload.data;

  self.registration.showNotification(title, {
    body,
    image,
    icon: image,
    data: payload.data,
  });
});

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click ", event);

  let { url } = event.notification.data;

  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          console.log();
          if ("focus" in client && "navigate" in client) client.focus();
          return client.navigate(`${self.location.origin}${url}`);
        }
        if (clients.openWindow)
          return clients.openWindow(`${self.location.origin}${url}`);
      })
  );
});
