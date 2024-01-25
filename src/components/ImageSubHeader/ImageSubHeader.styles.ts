import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

import { GUTTER_SIZE } from '../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: GUTTER_SIZE * 5,
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  chest: {
    position: 'absolute',
    height: SCREEN_WIDTH / 2.82,
    width: SCREEN_WIDTH / 2.8,
    top: -(SCREEN_WIDTH / 5.5),
    left: SCREEN_WIDTH / 15.6,
  },
  bonus: {
    position: 'absolute',
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 4.9,
    top: -(SCREEN_WIDTH / 7),
    right: SCREEN_WIDTH / 12.5,
  },
  freeSpins: {
    position: 'absolute',
    width: SCREEN_WIDTH / 2.5,
    height: SCREEN_WIDTH / 5,
    top: -(SCREEN_WIDTH / 30),
    right: SCREEN_WIDTH / 8,
  },
  present: {
    position: 'absolute',
    width: SCREEN_WIDTH / 3.2,
    height: SCREEN_WIDTH / 3.8,
    top: -(SCREEN_WIDTH / 8.5),
    left: SCREEN_WIDTH / 15.6,
  },
  bonusBig: {
    position: 'absolute',
    width: SCREEN_WIDTH / 2.24,
    height: SCREEN_WIDTH / 3.2,
    top: -(SCREEN_WIDTH / 5),
    right: SCREEN_WIDTH / 12.5,
  },
});
