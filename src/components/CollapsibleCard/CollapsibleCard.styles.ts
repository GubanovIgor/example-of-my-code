import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DARK_BACKGROUND,
  },
  titleContainer: {
    paddingHorizontal: GUTTER_SIZE * 3,
    paddingVertical: GUTTER_SIZE * 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.TEXT_GRAY,
  },
  activeTitle: {
    color: COLORS.TEXT_LIGHT,
  },
  topBorders: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bottomBorders: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  collapsibleView: {
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  separator: {
    marginHorizontal: 0,
    marginTop: GUTTER_SIZE * 8,
    marginBottom: GUTTER_SIZE,
  },
  description: {
    marginBottom: GUTTER_SIZE * 8,
  },
});
