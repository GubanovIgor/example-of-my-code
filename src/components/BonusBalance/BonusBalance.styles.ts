import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    marginTop: GUTTER_SIZE * 2,
    flexDirection: 'row',
    paddingHorizontal: GUTTER_SIZE * 4,
    justifyContent: 'space-between',
    marginBottom: GUTTER_SIZE * 3,
  },
  widget: {
    width: SCREEN_WIDTH / 2 - 24,
    paddingVertical: GUTTER_SIZE * 3,
    paddingHorizontal: GUTTER_SIZE * 4,
    borderRadius: 12,
    backgroundColor: COLORS.MIDDLE_BACKGROUND,
  },
  title: {
    textTransform: 'none',
    color: COLORS.WHITE_60,
    marginBottom: GUTTER_SIZE - 2,
  },
  balanceAmount: {
    color: COLORS.GREEN,
  },
  freeSpinsAmount: {
    color: COLORS.BLUE,
  },
  loader: {
    width: '100%',
    height: SCREEN_WIDTH / 5,
  },
});
