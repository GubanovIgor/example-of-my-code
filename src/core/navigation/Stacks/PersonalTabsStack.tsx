import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameSessionScreen, ProviderScreen } from 'modules/home';
import { PersonalTabsScreen } from 'modules/personal';
import { ChangePasswordScreen } from 'modules/personal/screens/ChangePassword';

import { PATHS } from 'constants/PATHS';

import { PersonalTabsStackParamList } from '../../interfaces/navigation';

const Stack = createNativeStackNavigator<PersonalTabsStackParamList>();

export const PersonalTabsStack = () => (
  <Stack.Navigator
    initialRouteName={PATHS.PERSONAL_TABS}
    screenOptions={{ headerShown: false, orientation: 'portrait' }}
  >
    <Stack.Screen
      name={PATHS.PERSONAL_TABS}
      key={PATHS.PERSONAL_TABS}
      component={PersonalTabsScreen}
    />
    <Stack.Screen
      name={PATHS.GAME_SESSION}
      key={PATHS.GAME_SESSION}
      component={GameSessionScreen}
    />
    <Stack.Screen
      name={PATHS.PROVIDER}
      key={PATHS.PROVIDER}
      component={ProviderScreen}
    />
    <Stack.Screen
      name={PATHS.CHANGE_PASSWORD}
      key={PATHS.CHANGE_PASSWORD}
      component={ChangePasswordScreen}
    />
  </Stack.Navigator>
);
