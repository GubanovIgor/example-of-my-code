import { StyleSheet } from 'react-native';

import { GUTTER_SIZE, SPACING } from '../../../../config/theme';

export const styles = StyleSheet.create({
  title: {
    marginLeft: SPACING.M,
    marginBottom: SPACING.XXL,
  },
  inputsContainer: {
    flex: 1,
    paddingTop: GUTTER_SIZE * 2,
    paddingHorizontal: SPACING.M,
  },
  forgotYourText: {
    marginLeft: GUTTER_SIZE * 4,
    marginTop: GUTTER_SIZE,
  },
  loginBtn: {
    marginTop: GUTTER_SIZE * 8,
  },
  underlineText: {
    textDecorationLine: 'underline',
    textTransform: 'lowercase',
  },
  underlineTextSignUp: {
    textDecorationLine: 'underline',
  },
  notRegisteredYet: { textAlign: 'center', marginTop: GUTTER_SIZE },
});
