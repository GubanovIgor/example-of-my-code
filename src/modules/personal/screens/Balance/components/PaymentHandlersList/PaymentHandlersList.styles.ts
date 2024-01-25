import { StyleSheet } from 'react-native';
import { GUTTER_SIZE, SPACING } from 'config/theme';

export const styles = StyleSheet.create({
  depositMethodsContainer: {
    paddingLeft: GUTTER_SIZE,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.M,
  },
});
