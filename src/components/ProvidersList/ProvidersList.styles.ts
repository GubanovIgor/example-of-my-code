import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingTop: GUTTER_SIZE * 2,
  },
  verticalContainer: {
    height: '100%',
  },
  contentContainer: {
    paddingTop: GUTTER_SIZE * 3,
    paddingLeft: GUTTER_SIZE * 3,
  },
  providerName: { color: COLORS.TEXT_LIGHT },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: GUTTER_SIZE * 3,
    justifyContent: 'space-between',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  verticalSearchContainer: {
    flexGrow: 1,
  },
  verticalDefaultContainer: {
    marginLeft: GUTTER_SIZE,
  },
  horizontalPadding: {
    paddingLeft: GUTTER_SIZE * 3,
  },
  arrowToRightIconContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    width: 48,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: GUTTER_SIZE * 2,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
  },
  separatorHorizontal: { width: GUTTER_SIZE * 2 },
  separatorVertical: { height: GUTTER_SIZE * 3 },
  image: { width: 90, height: 30 },
  imageNotLoaded: { width: 0, height: 0 },
});
