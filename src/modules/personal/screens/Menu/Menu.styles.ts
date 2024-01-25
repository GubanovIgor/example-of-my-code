import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
  },
  scrollView: { paddingTop: GUTTER_SIZE * 2 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceLoader: {
    marginBottom: GUTTER_SIZE * 4,
  },
  appVersion: {
    color: COLORS.TEXT_LIGHT,
  },
  header: {
    backgroundColor: COLORS.LIGHT_BACKGROUND,
  },
  separator: {
    marginVertical: GUTTER_SIZE * 2,
    marginHorizontal: 0,
  },
  horizontalPadding: {
    paddingHorizontal: GUTTER_SIZE * 8,
  },
  balance: {
    alignItems: 'flex-start',
    marginLeft: GUTTER_SIZE * 8,
    marginBottom: GUTTER_SIZE * 4,
  },
  footer: {
    paddingHorizontal: GUTTER_SIZE * 8,
  },
  logosContainer: {
    marginBottom: GUTTER_SIZE * 5,
  },
  logo: {
    width: 46,
    height: 46,
  },
});
