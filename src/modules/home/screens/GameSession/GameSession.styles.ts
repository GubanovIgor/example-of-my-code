import { StyleSheet } from 'react-native';

import { COLORS, GUTTER_SIZE } from '../../../../config/theme';
import { SCREEN_HEIGHT } from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Century Gothic',
    color: '#fff',
    fontSize: 40,
  },
  webViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: SCREEN_HEIGHT - GUTTER_SIZE * 5,
    backgroundColor: COLORS.BLACK,
  },
  webViewContainerStyle: {
    width: '100%',
    backgroundColor: COLORS.BLACK,
    height: '100%',
  },
});
