import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  CategoryScreen,
  GameSessionScreen,
  HomeScreen,
  ProviderScreen,
  ProvidersScreen,
  SubCategoryScreen,
} from 'modules/home';
import { TournamentScreen } from 'modules/home/screens/Tournament';
import { MyGamesScreen } from 'modules/personal';

import { PATHS } from 'constants/PATHS';

import { HomeStackParamList } from '../../interfaces/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName={PATHS.HOME}
    screenOptions={{
      headerShown: false,
      orientation: 'portrait',
    }}
  >
    <Stack.Screen name={PATHS.HOME} component={HomeScreen} />
    <Stack.Screen name={PATHS.SUB_CATEGORY} component={SubCategoryScreen} />
    <Stack.Screen name={PATHS.CATEGORY} component={CategoryScreen} />
    <Stack.Screen
      name={PATHS.GAME_SESSION}
      component={GameSessionScreen}
      options={{ orientation: 'all' }}
    />
    <Stack.Screen name={PATHS.PROVIDER} component={ProviderScreen} />
    <Stack.Screen name={PATHS.PROVIDERS} component={ProvidersScreen} />
    <Stack.Screen name={PATHS.TOURNAMENT} component={TournamentScreen} />
    <Stack.Screen name={PATHS.MY_GAMES} component={MyGamesScreen} />
  </Stack.Navigator>
);
