import { COLORS, SPACING } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInput: {
    height: 40,
    paddingHorizontal: SPACING.L,
    borderWidth: 1,
    borderColor: COLORS.ON_PRIMARY,
    borderRadius: 12,
  },
  helpText: {
    marginLeft: SPACING.L,
    marginTop: SPACING.XS,
  },
  captionText: {
    marginLeft: SPACING.L,
    marginTop: SPACING.XS,
    color: COLORS.TEXT_DANGER,
  },
  textInputDanger: {
    backgroundColor: COLORS.DANGER_BACKGROUND,
  },
  placeholderContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    padding: SPACING.XS,
    borderRadius: 4,
    zIndex: 2,
  },
});
