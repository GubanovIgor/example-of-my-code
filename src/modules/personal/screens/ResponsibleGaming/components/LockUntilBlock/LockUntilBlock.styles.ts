import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  selector: {
    width: '100%',
    marginTop: GUTTER_SIZE * 8,
  },
  button: {
    marginTop: GUTTER_SIZE * 4,
  },
  checkboxContainer: {
    alignItems: 'center',
  },
  checkboxInactive: {
    borderColor: COLORS.TEXT_LIGHT,
  },
  checkboxActive: {
    backgroundColor: COLORS.TEXT_LIGHT,
  },
  checkboxText: { marginLeft: GUTTER_SIZE * 3, flex: 1 },
});
