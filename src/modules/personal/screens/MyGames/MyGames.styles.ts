import { GUTTER_SIZE, SPACING } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gamesSectionContainer: {
    marginTop: GUTTER_SIZE * 6,
  },
  header: {
    paddingHorizontal: SPACING.M,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: GUTTER_SIZE * 3,
  },
  headerTitle: {
    marginLeft: GUTTER_SIZE * 3,
  },
});
