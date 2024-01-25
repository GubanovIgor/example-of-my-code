import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: GUTTER_SIZE * 3,
    paddingVertical: GUTTER_SIZE,
    paddingHorizontal: GUTTER_SIZE * 3,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    alignSelf: 'baseline',
  },
  text: {
    color: COLORS.ON_PRIMARY,
    textTransform: 'uppercase',
  },
});
