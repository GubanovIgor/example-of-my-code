import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - GUTTER_SIZE * 6,
    marginTop: GUTTER_SIZE * 10,
  },
  rulesTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.TEXT_LIGHT,
  },
  text: {
    color: COLORS.TEXT_GRAY,
    marginTop: GUTTER_SIZE * 6,
  },
});
