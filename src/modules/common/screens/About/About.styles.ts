import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: GUTTER_SIZE * 6,
    paddingHorizontal: GUTTER_SIZE * 5,
  },
  separator: {
    paddingTop: GUTTER_SIZE * 2,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomIconsContainer: {
    paddingHorizontal: GUTTER_SIZE * 8,
    marginTop: GUTTER_SIZE * 3,
  },
  bottomSeparator: {
    marginHorizontal: 0,
    marginTop: GUTTER_SIZE,
    marginBottom: GUTTER_SIZE * 4,
    borderColor: COLORS.OPTIONS_BACKGROUND,
  },
  circleIcon: {
    width: 30,
    height: 30,
  },
  beGambleLogo: {
    width: 86,
    height: 20,
  },
  rgcLogo: {
    width: 42,
    height: 30,
  },
  gameCareLogo: {
    width: 86,
    height: 30,
  },
  interactLogo: {
    width: 24,
    height: 24,
  },
});
