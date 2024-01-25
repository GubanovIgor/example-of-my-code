import { StyleSheet } from 'react-native';
import { COLORS, GUTTER_SIZE } from 'config/theme';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Century Gothic',
    color: COLORS.TEXT_LIGHT,
    fontSize: 40,
  },
  webViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    borderTopRightRadius: GUTTER_SIZE * 3,
    borderTopLeftRadius: GUTTER_SIZE * 3,
    maxHeight: SCREEN_HEIGHT - GUTTER_SIZE * 5,
    backgroundColor: COLORS.BLACK,
  },
  webViewContainerStyle: {
    width: '100%',
    borderTopRightRadius: GUTTER_SIZE * 3,
    borderTopLeftRadius: GUTTER_SIZE * 3,
    backgroundColor: COLORS.BLACK,
    height: '100%',
  },
});
