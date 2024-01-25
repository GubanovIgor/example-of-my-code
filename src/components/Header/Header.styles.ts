import { BUTTONS_HEIGHTS, GUTTER_SIZE } from 'config/theme';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: GUTTER_SIZE * 4,
    paddingHorizontal: GUTTER_SIZE * 4,
    zIndex: 1,
    paddingTop: Platform.select({ ios: 0, android: GUTTER_SIZE * 4 }),
  },
  depositBtnText: {
    marginLeft: GUTTER_SIZE * 2,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  depositButton: {
    width: 'auto',
    paddingHorizontal: GUTTER_SIZE * 3,
    height: BUTTONS_HEIGHTS.MEDIUM,
  },
  mediumBtn: {
    marginLeft: GUTTER_SIZE * 2,
    width: 'auto',
    height: BUTTONS_HEIGHTS.MEDIUM,
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  searchIconContainer: {
    marginHorizontal: GUTTER_SIZE * 3,
  },
});
