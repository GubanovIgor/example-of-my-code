import {
  BUTTONS_HEIGHTS,
  BUTTONS_WIDTHS,
  COLORS,
  GUTTER_SIZE,
} from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: GUTTER_SIZE * 3,
  },
  amountButton: {
    width: BUTTONS_WIDTHS.MEDIUM,
    height: BUTTONS_HEIGHTS.MEDIUM,
    backgroundColor: COLORS.OPTIONS_BACKGROUND,
  },
  firstDepositAmountButton: {
    width: BUTTONS_WIDTHS.MEDIUM,
    height: BUTTONS_HEIGHTS.MEDIUM,
    backgroundColor: COLORS.PERSIAN_BLUE,
  },
  activeBorder: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.SUNGLOW,
  },
  smallPresent: {
    position: 'absolute',
    width: SCREEN_WIDTH / 8.9,
    height: SCREEN_WIDTH / 22.7,
    top: -5,
    left: 10,
    zIndex: 2,
  },
  smallFreeSpins: {
    position: 'absolute',
    width: SCREEN_WIDTH / 7.65,
    height: SCREEN_WIDTH / 22,
    top: -5,
    left: 6,
    zIndex: 2,
  },
});
