import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 24,
    height: 50,
    backgroundColor: COLORS.MIDDLE_BACKGROUND,
    paddingHorizontal: GUTTER_SIZE * 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 26,
    width: 3,
    borderRadius: 30,
    backgroundColor: COLORS.PRIMARY,
  },
  message: { marginLeft: GUTTER_SIZE * 2 },
});
