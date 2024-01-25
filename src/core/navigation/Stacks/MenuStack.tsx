import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BetHistoryScreen,
  BonusesScreen,
  ChangePasswordScreen,
  MenuScreen,
  ProfileScreen,
  ResponsibleGamingScreen,
  ResultsScreen,
  WinningsScreen,
} from 'modules/personal';
import {
  AboutCompanyScreen,
  FAQScreen,
  SupportScreen,
  TournamentScreen,
} from 'modules/home';
import { AboutScreen } from 'modules/common';

import { PATHS } from 'constants/PATHS';

import { MenuStackParamList } from '../../interfaces/navigation';

const Stack = createNativeStackNavigator<MenuStackParamList>();

export const MenuStack = () => (
  <Stack.Navigator
    initialRouteName={PATHS.MENU}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={PATHS.MENU} component={MenuScreen} />
    <Stack.Screen name={PATHS.PROFILE} component={ProfileScreen} />
    <Stack.Screen name={PATHS.BET_HISTORY} component={BetHistoryScreen} />
    <Stack.Screen name={PATHS.BONUSES} component={BonusesScreen} />
    <Stack.Screen name={PATHS.WINNINGS} component={WinningsScreen} />
    <Stack.Screen name={PATHS.RESULTS} component={ResultsScreen} />
    <Stack.Screen name={PATHS.TOURNAMENTS} component={TournamentScreen} />
    <Stack.Screen name={PATHS.SUPPORT} component={SupportScreen} />
    <Stack.Screen name={PATHS.ABOUT_COMPANY} component={AboutCompanyScreen} />
    <Stack.Screen name={PATHS.FAQ} component={FAQScreen} />
    <Stack.Screen
      name={PATHS.CHANGE_PASSWORD}
      component={ChangePasswordScreen}
    />
    <Stack.Screen name={PATHS.ABOUT} component={AboutScreen} />
    <Stack.Screen
      name={PATHS.RESPONISBLE_GAMING}
      component={ResponsibleGamingScreen}
    />
  </Stack.Navigator>
);
