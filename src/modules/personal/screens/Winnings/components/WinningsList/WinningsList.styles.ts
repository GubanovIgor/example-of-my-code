import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

const ITEM_WIDTH = SCREEN_WIDTH / 5;
const ITEM_HEIGHT = ITEM_WIDTH / 1.5;

export const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
  },
  contentContainer: { paddingTop: GUTTER_SIZE * 3 },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 12,
  },
  gameInfo: {
    marginLeft: GUTTER_SIZE * 3,
  },
  winningInfo: { alignItems: 'flex-end' },
  winningAmount: { color: COLORS.SUCCESS },
  winningDate: {
    color: COLORS.WHITE_60,
    marginTop: 1,
  },
  gameName: { textTransform: 'none' },
  gameProvider: { color: COLORS.WHITE_60, marginTop: 2 },
  listSeparator: { marginBottom: GUTTER_SIZE * 3 },
});
