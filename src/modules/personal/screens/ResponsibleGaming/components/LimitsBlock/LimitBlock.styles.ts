import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    marginTop: GUTTER_SIZE * 4,
  },
  input: {
    width: '100%',
  },
  inputMargin: {
    marginTop: GUTTER_SIZE * 4,
  },
  nextPossibleDateText: {
    color: COLORS.WHITE_60,
    textTransform: 'none',
    marginTop: GUTTER_SIZE,
  },
  usedText: {
    color: COLORS.TEXT_GRAY,
    marginTop: GUTTER_SIZE,
  },
  inputBottomInfoContainer: {
    marginLeft: GUTTER_SIZE * 4,
  },
});
