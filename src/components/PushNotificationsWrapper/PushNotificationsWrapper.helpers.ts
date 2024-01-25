import messaging from '@react-native-firebase/messaging';

export const getFirebaseToken = async () => {
  let fcmToken = await messaging().getToken();

  return fcmToken;
};

export const handlePushNotification = (_data: Record<string, string>) => {
  //TODO handle push notification when backend will be ready
};
