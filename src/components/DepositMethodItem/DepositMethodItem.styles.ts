import { StyleSheet } from 'react-native';
import { COLORS, GUTTER_SIZE, SPACING } from 'config/theme';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

const columnsAmount = 3;

export const styles = StyleSheet.create({
  depositMethodContainer: {
    width: (SCREEN_WIDTH - GUTTER_SIZE * 12) / columnsAmount,
    height: 79,
    borderWidth: 1,
    borderColor: COLORS.ON_PRIMARY,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    backgroundColor: COLORS.WHITE_05,
  },
  depositMethodTitle: {
    marginTop: SPACING.S,
    textTransform: 'none',
    color: COLORS.TEXT_GRAY,
  },

  imageContainer: {
    width: 62,
    height: 32,
  },
});
