import { StyleSheet } from 'react-native';
import { GUTTER_SIZE, SPACING } from 'config/theme';

export const styles = StyleSheet.create({
  title: {
    marginLeft: SPACING.M,
    marginBottom: SPACING.XXL,
  },
  inputsContainer: {
    flex: 1,
    paddingHorizontal: SPACING.M,
    paddingTop: GUTTER_SIZE,
  },
  button: {
    marginVertical: GUTTER_SIZE * 8,
  },
});
