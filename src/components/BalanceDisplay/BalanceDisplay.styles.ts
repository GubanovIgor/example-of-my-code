import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  withdrawalText: {
    marginTop: GUTTER_SIZE,
  },
  headerText: {
    marginRight: GUTTER_SIZE * 2,
    textAlign: 'center',
  },
  loader: {
    marginRight: GUTTER_SIZE * 2,
  },
  title: { color: COLORS.WHITE_60 },
});
