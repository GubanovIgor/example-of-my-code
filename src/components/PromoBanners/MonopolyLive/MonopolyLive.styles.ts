import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

const BG_WIDTH = SCREEN_WIDTH - GUTTER_SIZE * 6;

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH / 4.57,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  bg: {
    width: BG_WIDTH,
    height: BG_WIDTH / 7,
    borderRadius: 12,
    position: 'absolute',
  },
  img: {
    position: 'absolute',
    height: SCREEN_WIDTH / 4.57,
    width: BG_WIDTH / 2,
    right: 0,
    bottom: 5,
  },
  textContainer: {
    width: SCREEN_WIDTH - GUTTER_SIZE * 6,
    paddingLeft: GUTTER_SIZE * 3,
  },
  title: {
    color: COLORS.TEXT_LIGHT,
    textAlign: 'left',
  },
  text: {
    textTransform: 'lowercase',
  },
});
