import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - GUTTER_SIZE * 6,
    marginTop: GUTTER_SIZE * 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.TEXT_LIGHT,
  },
  playersAmountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
