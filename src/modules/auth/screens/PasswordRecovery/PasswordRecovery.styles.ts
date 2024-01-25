import { StyleSheet } from 'react-native';
import { COLORS, GUTTER_SIZE, SPACING } from 'config/theme';

export const styles = StyleSheet.create({
  title: {
    marginLeft: SPACING.M,
    marginBottom: SPACING.XXL,
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.M,
  },
  subTitle: {
    marginBottom: GUTTER_SIZE * 3,
  },
  button: {
    marginVertical: GUTTER_SIZE * 8,
  },
  resendCodeContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY,
    right: 4,
    top: 4,
  },
  disabledCodeContainer: {
    opacity: 0.5,
  },
});
