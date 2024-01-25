import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { PushNotificationsService } from 'core/services/PushNotificationsService';

import App from './App';
import { name as appName } from './app.json';

enableScreens();
PushNotificationsService.configure();
AppRegistry.registerComponent(appName, () => App);
