import firebase from "firebase/app";
import "firebase/messaging";
import { Capacitor } from "@capacitor/core";
import { request } from "@umijs/max";

/**
 * WARNING
 * WARNING
 * WARNING
 *
 * If you're fiddling around here, be sure to check the firebase
 * worker that runs on background called `firebase-messaging-sw.js`
 */

let firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECTID,
  storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: REACT_APP_FIREBASE_APPID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENTID,
};

let token = "";
let messaging: any = null;

if (Capacitor.getPlatform() === "web") {
  try {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    messaging = firebase.messaging();
    messaging.usePublicVapidKey(
      REACT_APP_FIREBASE_USEPUBLICVAPIDKEY
    );

    messaging
      .getToken()
      .then((currentToken) => {
        if (currentToken) {
          token = currentToken;
        } else {
          // Show permission request.
        }
      })
      .catch(() => {});

    messaging.onMessage((payload) => {
      let { title, body, image, url } = payload.data;

      let notif = new Notification(title, {
        body,
        image,
        icon: image,
      });

      notif.onclick = () => (window.location.href = url);
    });
  } catch (err) {
    console.error("FCMService", err);
  }
}

export async function getWebFCMToken() {
  return await messaging?.getToken();
}

export async function getMyTopics(token: string): Promise<string[]> {
  //As vezes o token vem vazio na primeira chamada
  if (!token) {
    return [];
  }

  let response = await request(`/v3/notifications/firebase/details/`, {
    method: 'POST',
    data: {
      token,
    }
  })

  if (!response.rel) {
    return [];
  }


  let mySubscribedTopics = Object.keys(response.rel.topics);

  return mySubscribedTopics;
}

export async function subscribeTokenToTopic(topic) {
  await request(`/v3/notifications/firebase/`, {
    method: 'POST',
    data: {
      token,
      topic,
    }
  })
}

export async function unsubscribeTokenFromTopic(topic) {
  await request(`/v3/notifications/firebase/`, {
    method: 'DELETE',
    data: {
      token,
      topic,
    }
  })
}
