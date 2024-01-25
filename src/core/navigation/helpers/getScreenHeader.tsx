import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';
import { Header } from 'components/Header';
import { RootStackParamList } from 'core/interfaces/navigation';

import { PATHS } from 'constants/PATHS';

const routesWithoutHeader: [string | undefined] = [PATHS.GAME_SESSION];

export const getScreenHeader = (route: RouteProp<RootStackParamList>) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (routesWithoutHeader.includes(routeName)) {
    return null;
  }

  return <Header />;
};
