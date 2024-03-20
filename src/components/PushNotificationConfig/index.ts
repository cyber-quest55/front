import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { getMyTopics, getWebFCMToken, subscribeTokenToTopic, unsubscribeTokenFromTopic } from '@/utils/FCMService'
import { useEffect } from 'react';
import { FCM } from "@capacitor-community/fcm";
import { getLocale, useModel, useNavigate } from '@umijs/max';

const languages = ["pt-br", "en", "ru", "es", "de-at"];

const PushNotificationConfig: React.FC<Record<string, never>> = () => {
  const language = getLocale();
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState');
  const userID = initialState?.currentUser?.id;

  const registerAndSubscribeAll = async () => {
    let topicsToSubscribe: any[] = [];
    let topicsToUnsubscribe: any[] = [];
    
    if (userID === -1 || !userID) return;

    const notificationsSufix = ["pivot", "pivot-monitor", "irpd"];
    let nAlertTopics: any = languages.flatMap((language) => {
      return notificationsSufix.map((sufix) => {
        return `${FCM_SUFFIX}n-${sufix}-user-${userID}-${language}`;
      });
    });

    if (Capacitor.getPlatform() === "web") {
      let token = await getWebFCMToken();

      if (token === "" || token === undefined) return;

      let mySubscribedTopics = await getMyTopics(token);

      nAlertTopics.forEach((alertTopic) => {
        //If i'm not already subscribed to this topic, subscribe to it
        if (!mySubscribedTopics.includes(alertTopic)) {
          topicsToSubscribe.push(alertTopic);
        }
      });

      mySubscribedTopics.forEach((subscribedTopic) => {
        //If i don't need to subscribe to this topics anymore, unsubscribe from it
        if (!nAlertTopics.includes(subscribedTopic)) {
          topicsToUnsubscribe.push(subscribedTopic);
        }
      });

      //Do the un/subscription
      topicsToSubscribe.forEach((topicToSubscribe) =>
        subscribeTokenToTopic(topicToSubscribe)
      );
      topicsToUnsubscribe.forEach((topicToUnsubscribe) =>
        unsubscribeTokenFromTopic(topicToUnsubscribe)
      );
    } else {
      (async () => {
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === "prompt") {
          permStatus = await PushNotifications.requestPermissions();
        }

        PushNotifications.register().then(async () => {
          let fcmToken = await FCM.getToken();
          let token = fcmToken.token;
          let mySubscribedTopics = await getMyTopics(token);

          let topicsToSubscribe: any = [];
          let topicsToUnsubscribe: any = [];

          PushNotifications.createChannel({
            id: "highimportancechannel",
            description: "High priority notifications",
            importance: 5,
            visibility: 1,
            lights: true,
            vibration: true,
            sound: "classicalarm",
            name: "Critical Channel",
          })
            .then((success) => console.log("channel", success))
            .catch((err) => console.log("channel err", err));

          PushNotifications.createChannel({
            id: "mediumimportancechannel",
            description: "Normal priority notifications",
            importance: 3,
            visibility: 1,
            lights: true,
            vibration: true,
            sound: "default",
            name: "Normal Channel",
          })
            .then((success) => console.log("channel", success))
            .catch((err) => console.log("channel err", err));

          PushNotifications.createChannel({
            id: "lowimportancechannel",
            description: "Low priority notifications",
            importance: 1,
            visibility: 1,
            lights: true,
            vibration: true,
            sound: "default",
            name: "Low Channel",
          })
            .then((success) => console.log("channel", success))
            .catch((err) => console.log("channel err", err));

          PushNotifications.createChannel({
            id: "adimportancechannel",
            description: "Marketing and advertising notifications",
            importance: 3,
            visibility: 1,
            lights: true,
            vibration: true,
            sound: "default",
            name: "Marketing Channel",
          })
            .then((success) => console.log("channel", success))
            .catch((err) => console.log("channel err", err));

          nAlertTopics.forEach((alertTopic: any) => {
            //If i'm not already subscribed to this topic, subscribe to it
            if (!mySubscribedTopics.includes(alertTopic)) {
              topicsToSubscribe.push(alertTopic);
            }
          });

          mySubscribedTopics.forEach((subscribedTopic: any) => {
            //If i don't need to subscribe to this topics anymore, unsubscribe from it
            if (!nAlertTopics.includes(subscribedTopic)) {
              topicsToUnsubscribe.push(subscribedTopic);
            }
          });

          //Do the un/subscription
          topicsToSubscribe.forEach((topicToSubscribe) =>
            FCM.subscribeTo({ topic: topicToSubscribe })
              .then((r) => console.log(r))
              .catch((err) => console.log(err))
          );

          topicsToUnsubscribe.forEach((topicToUnsubscribe) =>
            FCM.unsubscribeFrom({ topic: topicToUnsubscribe })
              .then((r) => console.log(r))
              .catch((err) => console.log(err))
          );
        });
      })();
      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification) => console.log(notification)
      );

      // Method called when tapping on a notification
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        function (notification) {
          let { url } = notification.notification.data;
          if (window.location.href === `${window.location.host}${url}`) return;
          navigate(url);
        }
      );
    }
  };

  useEffect(() => {
    if (language) {
      registerAndSubscribeAll();
    }
  }, [language, userID]);

  return null;
};

export default PushNotificationConfig;
