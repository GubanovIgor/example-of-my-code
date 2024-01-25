import {
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

import { COLORS } from '../../config/theme';
import { SCREEN_HEIGHT } from '../../constants';

export const modalMarginTop = SCREEN_HEIGHT * 0.1;

export const MODAL_CARD_STYLE = {
  marginTop: modalMarginTop,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  backgroundColor: COLORS.LIGHT_BACKGROUND,
};
export const MODAL_SCREEN_OPTIONS: StackNavigationOptions = {
  presentation: 'modal',
  cardStyle: MODAL_CARD_STYLE,
  gestureEnabled: true,
  gestureResponseDistance: modalMarginTop * 2,
  ...TransitionPresets.ModalPresentationIOS,
};
