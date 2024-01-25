import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

const MODAL_WIDTH = SCREEN_WIDTH - GUTTER_SIZE * 30;

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: MODAL_WIDTH,
    minHeight: MODAL_WIDTH / 2,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: GUTTER_SIZE * 10,
    paddingVertical: GUTTER_SIZE * 3,
    borderWidth: 1,
    borderColor: COLORS.GRAY_BORDER,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
  },
  crossContainer: {
    position: 'absolute',
    right: GUTTER_SIZE * 3,
    top: GUTTER_SIZE * 3,
  },
});
