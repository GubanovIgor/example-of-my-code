import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ASYNC_STORAGE_KEYS } from 'constants/ASYNC_STORAGE_KEYS';

export const PushNotificationsService = {
  configure: async function () {
    await this.checkPermission();
  },

  requestPermission: async function () {
    const authStatus = await messaging().requestPermission();

    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      await this.finishFirebaseRegistration();
    }
  },

  checkPermission: async function () {
    const permissionStatus = await messaging().hasPermission();

    if (permissionStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      await this.finishFirebaseRegistration();
    } else {
      await this.requestPermission();
    }
  },

  getFCMToken: async function () {
    const fcmTokenAsync = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEYS.FCM_TOKEN,
    );

    if (fcmTokenAsync) return fcmTokenAsync;

    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }

    return await messaging().getToken();
  },

  saveFCMToken: async function (token: string) {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.FCM_TOKEN, token);
  },

  finishFirebaseRegistration: async function () {
    const token = await this.getFCMToken();

    await this.saveFCMToken(token);
  },

  setBackgroundMessageHandler: async function () {
    //Nothing todo in callback, it's for settings firebase background listener
    messaging().setBackgroundMessageHandler(async (_remoteMessage) => {});
  },

  sendFCMTokenToServer: async function () {
    const token = await this.getFCMToken();

    if (!token) return;

    //TODO send request to backend to save token
  },
};
