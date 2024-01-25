import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GUTTER_SIZE * 3,
    paddingTop: GUTTER_SIZE * 5,
  },
  docName: {
    color: COLORS.TEXT_GRAY,
    textTransform: 'none',
    lineHeight: 28,
  },
});
