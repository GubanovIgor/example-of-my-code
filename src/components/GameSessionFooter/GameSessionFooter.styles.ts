import { StyleSheet } from 'react-native';

import { COLORS, GUTTER_SIZE } from '../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: GUTTER_SIZE * 4,
    paddingHorizontal: GUTTER_SIZE * 6,
    backgroundColor: COLORS.TERTIARY,
    justifyContent: 'space-between',
  },
  button: {
    width: 158,
    height: 32,
  },
});
