import { COLORS } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
  },
  loaderContainer: {
    backgroundColor: COLORS.BACKGROUND,
  },
});
