import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: GUTTER_SIZE * 4,
  },
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: GUTTER_SIZE * 3,
    paddingVertical: GUTTER_SIZE * 7,
  },
  itemImage: {
    width: 92,
    height: 60,
    borderRadius: GUTTER_SIZE * 3,
  },
  itemName: {
    color: COLORS.ON_PRIMARY,
  },
  itemProvider: {
    color: COLORS.WHITE_60,
    marginTop: GUTTER_SIZE - 2,
  },
  itemInfoContainer: {
    paddingLeft: GUTTER_SIZE * 3,
  },
  emptyComponent: {
    paddingTop: GUTTER_SIZE * 10,
    alignItems: 'center',
  },
  noGamesText: {
    color: COLORS.TEXT_LIGHT,
  },
});
