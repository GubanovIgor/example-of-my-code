import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: GUTTER_SIZE * 3,
    borderTopRightRadius: GUTTER_SIZE * 3,
    height: 'auto',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: COLORS.DARK4,
  },
  flex: {
    flex: 1,
  },
});
