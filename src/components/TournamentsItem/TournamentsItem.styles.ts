import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 365,
    borderRadius: 12,
    marginTop: GUTTER_SIZE * 8,
  },
  infoSection: {
    alignItems: 'center',
    width: 240,
    height: 258,
    backgroundColor: COLORS.TOURNAMENT_BACKGROUND,
    borderRadius: 12,
    marginTop: -10,
  },
  imageBg: {
    width: 240,
    height: 119,
  },
  image: {
    width: 144,
    height: 144,
    position: 'absolute',
    top: -25,
    left: 41,
  },
});
