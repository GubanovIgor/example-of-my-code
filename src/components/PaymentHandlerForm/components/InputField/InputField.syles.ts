import { StyleSheet } from 'react-native';
import {
  BUTTONS_HEIGHTS,
  BUTTONS_WIDTHS,
  COLORS,
  GUTTER_SIZE,
} from 'config/theme';

export const styles = StyleSheet.create({
  field: {
    width: '100%',
    marginTop: GUTTER_SIZE * 3,
  },
  fastAmountOptionsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: GUTTER_SIZE * 3,
  },
  fastAmountOptionBtn: {
    width: BUTTONS_WIDTHS.MEDIUM,
    height: BUTTONS_HEIGHTS.MEDIUM,
    backgroundColor: COLORS.OPTIONS_BACKGROUND,
  },
});
