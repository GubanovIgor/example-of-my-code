import { StyleSheet } from 'react-native';
import { COLORS, GUTTER_SIZE, SPACING } from 'config/theme';

export const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SPACING.M,
    paddingTop: GUTTER_SIZE,
  },
  registerButtonContainer: {
    marginVertical: GUTTER_SIZE * 8,
  },
  registerButtonText: {
    color: COLORS.TEXT_LIGHT,
    textTransform: 'uppercase',
  },
  currencyInput: {
    height: 40,
    marginTop: SPACING.M,
  },
});
