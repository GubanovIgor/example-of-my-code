import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sectionTitleContainer: {
    paddingVertical: GUTTER_SIZE,
    paddingHorizontal: GUTTER_SIZE * 5,
    backgroundColor: COLORS.MIDDLE_BACKGROUND,
  },
  sectionTitle: {
    color: COLORS.TEXT_LIGHT,
  },
});
