import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import { CardOverlay } from 'components/CardOverlay';

import { bottomSheetAnimation } from '../animations';

export const getBottomSheetScreenOptions = (): StackNavigationOptions => ({
  cardStyleInterpolator: bottomSheetAnimation,
  cardOverlay: ({ style }) => <CardOverlay style={style} />,
  header: () => null,
  cardStyle: { backgroundColor: 'transparent' },
  gestureEnabled: true,
  detachPreviousScreen: false,
  cardOverlayEnabled: true,
  gestureDirection: 'vertical',
});
