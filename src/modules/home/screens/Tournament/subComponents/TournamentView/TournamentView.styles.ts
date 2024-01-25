import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

const TOURNAMENT_WIDTH = SCREEN_WIDTH - GUTTER_SIZE * 6;

export const styles = StyleSheet.create({
  container: {
    width: TOURNAMENT_WIDTH,
    height: 381,
    borderRadius: 12,
    marginTop: GUTTER_SIZE * 14,
  },
  infoSection: {
    alignItems: 'center',
    width: TOURNAMENT_WIDTH,
    height: 218,
    backgroundColor: COLORS.TOURNAMENT_BACKGROUND,
    borderRadius: 12,
    marginTop: -20,
  },
  imageBg: {
    width: TOURNAMENT_WIDTH,
    height: TOURNAMENT_WIDTH / 2.02,
  },
  image: {
    width: 210,
    height: 210,
    position: 'absolute',
    top: -37,
    left: 61,
  },
  infoWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
