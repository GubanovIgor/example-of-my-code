import { StyleSheet } from 'react-native';
import { SPACING } from 'config/theme';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.L,
    marginLeft: SPACING.M,
  },
  title: {
    marginLeft: SPACING.M,
  },
});
