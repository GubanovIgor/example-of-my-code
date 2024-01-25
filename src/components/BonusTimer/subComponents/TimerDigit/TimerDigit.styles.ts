import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    padding: GUTTER_SIZE,
    borderRadius: 4,
    marginHorizontal: GUTTER_SIZE / 4,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
  },
});
