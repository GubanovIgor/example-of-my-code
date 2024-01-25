import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: GUTTER_SIZE * 3,
  },
  label: {
    color: COLORS.TEXT_GRAY,
    textTransform: 'capitalize',
  },
  value: {
    marginTop: GUTTER_SIZE,
    color: COLORS.TEXT_LIGHT,
    textTransform: 'capitalize',
  },
});
