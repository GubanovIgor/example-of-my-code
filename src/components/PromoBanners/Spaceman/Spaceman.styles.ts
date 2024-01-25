import { GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

const BG_WIDTH = SCREEN_WIDTH - GUTTER_SIZE * 6;

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: BG_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: GUTTER_SIZE * 2,
    marginTop: GUTTER_SIZE * 4,
  },
  bg: {
    width: BG_WIDTH,
    height: BG_WIDTH / 2,
  },
  button: {
    position: 'absolute',
    width: BG_WIDTH / 3.1,
    height: BG_WIDTH / 11,
    bottom: 13,
    left: 30,
  },
});
