import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

const PADDING_FROM_TABS = 80;

export const styles = StyleSheet.create({
  opacityContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    opacity: 0.8,
    height: '100%',
    top: GUTTER_SIZE * 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: GUTTER_SIZE * 3,
    top: PADDING_FROM_TABS,
  },
  textStyle: {
    color: COLORS.ON_PRIMARY,
    textAlign: 'center',
  },
  verifyBtn: {
    marginTop: GUTTER_SIZE * 8,
  },
});
