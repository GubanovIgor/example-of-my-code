import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: GUTTER_SIZE * 10,
  },
  title: {
    color: COLORS.ON_PRIMARY,
    textTransform: 'uppercase',
    marginLeft: GUTTER_SIZE * 4,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
