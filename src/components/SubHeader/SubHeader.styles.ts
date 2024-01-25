import { StyleSheet } from 'react-native';

import { COLORS, GUTTER_SIZE } from '../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: GUTTER_SIZE * 4,
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  title: {
    color: COLORS.ON_PRIMARY,
    textTransform: 'uppercase',
    fontSize: 20,
  },
  btn: {
    marginRight: GUTTER_SIZE * 3,
  },
});
