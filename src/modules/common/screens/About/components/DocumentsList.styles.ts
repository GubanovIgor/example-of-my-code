import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: GUTTER_SIZE * 3,
  },
  docName: {
    color: COLORS.TEXT_LIGHT,
    textTransform: 'none',
    lineHeight: 16,
  },
  titleContainer: {
    paddingVertical: GUTTER_SIZE * 3,
    marginTop: GUTTER_SIZE * 2,
  },
  title: {
    color: COLORS.TEXT_LIGHT,
    lineHeight: 16,
  },
});
