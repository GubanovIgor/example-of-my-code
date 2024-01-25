import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  bonusContainer: {
    marginTop: GUTTER_SIZE * 4,
    flexDirection: 'row',
    paddingHorizontal: GUTTER_SIZE * 4,
    justifyContent: 'space-between',
    marginBottom: GUTTER_SIZE * 3,
  },
  bonusWidget: {
    width: SCREEN_WIDTH / 2 - 24,
    paddingVertical: GUTTER_SIZE * 3,
    paddingHorizontal: GUTTER_SIZE * 4,
    borderRadius: 12,
    backgroundColor: COLORS.MIDDLE_BACKGROUND,
  },
  bonusTitle: {
    textTransform: 'none',
    color: COLORS.WHITE_60,
    marginBottom: GUTTER_SIZE - 2,
  },
  bonusBalanceAmount: {
    color: COLORS.GREEN,
  },
  freeSpinsAmount: {
    color: COLORS.BLUE,
  },
  loaderOrErrorView: {
    width: '100%',
    alignItems: 'center',
    height: SCREEN_WIDTH / 3 + GUTTER_SIZE * 4,
    paddingHorizontal: GUTTER_SIZE * 8,
  },
  mainBalanceContainer: {
    paddingHorizontal: GUTTER_SIZE * 8,
  },
  mainBalanceTitle: {
    marginBottom: GUTTER_SIZE,
    color: COLORS.WHITE_60,
  },
  errorMessage: { color: COLORS.WHITE, marginBottom: GUTTER_SIZE * 6 },
});
