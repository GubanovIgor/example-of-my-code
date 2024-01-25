import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import {
  BONUS_HEIGHT,
  BONUS_WIDTH,
  COLORED_BOX_HEIGHT,
  COLORED_BOX_WIDTH,
} from './BonusItem.constants';

export const styles = StyleSheet.create({
  container: {
    width: BONUS_WIDTH,
    height: BONUS_HEIGHT,
    backgroundColor: COLORS.BONUS_BACKGROUND,
    borderRadius: 12,
    marginBottom: GUTTER_SIZE * 6,
  },
  expiredContainer: {
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  timerContainer: {
    width: BONUS_WIDTH - COLORED_BOX_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerTitle: {
    textAlign: 'center',
    textTransform: 'none',
    marginBottom: GUTTER_SIZE * 2,
    color: COLORS.TEXT_MIDDLE,
  },
  coloredBoxCurve: {
    position: 'absolute',
    right: COLORED_BOX_WIDTH / 1.41,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderTopWidth: COLORED_BOX_HEIGHT / 1.16,
    borderRightWidth: 50,
    borderBottomWidth: 0,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: COLORS.HELIOTROPE_BACKGROUND,
  },
  coloredBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: COLORED_BOX_WIDTH,
    height: COLORED_BOX_HEIGHT,
    backgroundColor: COLORS.HELIOTROPE_BACKGROUND,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bonusName: {
    marginHorizontal: GUTTER_SIZE * 4,
  },
});
