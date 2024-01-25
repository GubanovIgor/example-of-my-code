import { COLORS, GUTTER_SIZE, SPACING } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

const SQUARE_BOX_WIDTH = SCREEN_WIDTH / 4 - GUTTER_SIZE * 4;

export const styles = StyleSheet.create({
  gameItemContainer: {
    alignItems: 'center',
    marginRight: 8,
    justifyContent: 'flex-end',
    height: 102,
    marginTop: 10,
  },
  halfCircle: {
    width: 55,
    height: 55,
    backgroundColor: COLORS.DARK_BACKGROUND,
    borderRadius: 55 / 2,
    position: 'absolute',
    top: -8,
    alignItems: 'center',
    paddingVertical: SPACING.M,
    zIndex: 1,
  },
  squareBox: {
    width: SQUARE_BOX_WIDTH,
    height: 82,
    borderRadius: 12,
    backgroundColor: COLORS.DARK_BACKGROUND,
    justifyContent: 'flex-end',
  },
  aviator: {
    backgroundColor: COLORS.ACTIVE_TEXT,
  },
  image: {
    height: 40,
    width: 40,
    borderWidth: 1,
  },
  gameTitleContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: GUTTER_SIZE,
    marginBottom: 12,
  },
  gameTitle: {
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
    height: 'auto',
    flexShrink: 1,
  },
});
