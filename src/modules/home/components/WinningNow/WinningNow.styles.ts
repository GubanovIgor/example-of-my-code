import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    paddingLeft: GUTTER_SIZE * 2,
    paddingTop: GUTTER_SIZE,
    paddingBottom: GUTTER_SIZE * 8,
  },
  itemContainer: {
    width: SCREEN_WIDTH / 2 + 16,
    marginRight: GUTTER_SIZE * 2,
  },
  title: {
    marginBottom: GUTTER_SIZE * 3,
    color: COLORS.TEXT_LIGHT,
  },
  gameImg: {
    width: SCREEN_WIDTH / 4 - 12,
    height: SCREEN_WIDTH / 5 - 24,
    borderRadius: 12,
  },
  userName: { color: COLORS.TEXT_LIGHT, opacity: 0.2 },
  amount: {
    flex: 1,
    color: COLORS.PRIMARY,
    marginLeft: GUTTER_SIZE * 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRightSide: {
    flex: 1,
    marginLeft: GUTTER_SIZE * 3,
  },
  gameName: {
    color: COLORS.TEXT_LIGHT,
    marginTop: GUTTER_SIZE,
    marginRight: GUTTER_SIZE,
  },
});
