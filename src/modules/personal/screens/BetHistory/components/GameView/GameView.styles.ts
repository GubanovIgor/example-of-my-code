import { BUTTONS_HEIGHTS, COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH / 3,
    height: '100%',
    borderRadius: 12,
  },
  info: {
    marginLeft: GUTTER_SIZE * 3,
    flex: 1,
  },
  providerName: {
    textTransform: 'none',
    color: COLORS.TEXT_GRAY,
    marginTop: GUTTER_SIZE,
  },
  button: {
    flex: 1,
    height: BUTTONS_HEIGHTS.MEDIUM,
  },
  btnText: {
    textTransform: 'uppercase',
  },
  buttonMargin: {
    marginRight: GUTTER_SIZE * 3,
  },
  buttonsContainer: {
    marginTop: GUTTER_SIZE * 3,
    flexDirection: 'row',
  },
});
