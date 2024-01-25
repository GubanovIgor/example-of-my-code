import { StyleSheet } from 'react-native';
import { COLORS, GUTTER_SIZE } from 'config/theme';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

const GAME_IMG_WIDTH = SCREEN_WIDTH - GUTTER_SIZE * 18;
const GAME_IMG_HEIGHT = GAME_IMG_WIDTH * 0.99;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  subContainer: {
    alignItems: 'center',
    width: '100%',
  },
  gameName: {
    color: COLORS.ON_PRIMARY,
    textTransform: 'uppercase',
  },
  providerName: {
    marginTop: GUTTER_SIZE + 2,
    color: COLORS.TEXT_GRAY,
  },
  image: {
    width: GAME_IMG_WIDTH,
    height: GAME_IMG_HEIGHT,
    borderRadius: 12,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: GUTTER_SIZE * 8,
    marginTop: GUTTER_SIZE * 8,
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  defaultBtn: {
    flex: 1,
  },
  buttonLeftMargin: {
    marginLeft: GUTTER_SIZE * 3,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: GUTTER_SIZE * 8,
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  btnText: { color: COLORS.ON_PRIMARY, textTransform: 'uppercase' },
});
