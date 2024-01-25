import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SCREEN_WIDTH / 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: COLORS.ON_PRIMARY,
    lineHeight: 24,
    textTransform: 'none',
    marginTop: GUTTER_SIZE * 10,
  },
  description: {
    textAlign: 'center',
    color: COLORS.TEXT_GRAY,
    marginTop: GUTTER_SIZE * 2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    marginTop: GUTTER_SIZE * 15,
    width: SCREEN_WIDTH - 6,
    paddingHorizontal: GUTTER_SIZE * 3,
  },
});
