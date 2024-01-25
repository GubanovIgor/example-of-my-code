import { FC, ReactElement, useCallback, useEffect } from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { PushNotificationsService } from 'core/services/PushNotificationsService';
import notifee from '@notifee/react-native';

import { handlePushNotification } from './PushNotificationsWrapper.helpers';

interface Props {
  children: ReactElement;
}

export const PushNotificationsWrapper: FC<Props> = ({ children }) => {
  const setNotificationListener = useCallback(async () => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (!remoteMessage?.data) return;

        handlePushNotification(remoteMessage?.data);
      });
  }, []);

  /*
   * Triggered for data only payload in foreground
   * */
  const onMessageForegroundAction = useCallback(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        title: remoteMessage?.notification?.title || '',
        body: remoteMessage?.notification?.body || '',
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });
    },
    [],
  );

  useEffect(() => {
    setNotificationListener();
  }, [setNotificationListener]);

  useEffect(() => {
    const unsubscribeNotificationOpennedApp =
      messaging().onNotificationOpenedApp((remoteMessage) => {
        if (remoteMessage?.data) {
          handlePushNotification(remoteMessage?.data);
        }
      });

    return unsubscribeNotificationOpennedApp;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage) => {
      onMessageForegroundAction(remoteMessage);
    });

    return unsubscribe;
  }, [onMessageForegroundAction]);

  useEffect(() => {
    const unsubscribe = messaging().onTokenRefresh((token) => {
      PushNotificationsService.saveFCMToken(token);
    });

    return unsubscribe;
  }, []);

  return children;
};
