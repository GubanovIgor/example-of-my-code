import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: GUTTER_SIZE * 3,
    paddingTop: GUTTER_SIZE * 6,
  },
  saveBtn: {
    marginTop: GUTTER_SIZE * 8,
  },
  saveBtnContainer: {
    width: '100%',
  },
  forgotYourText: {
    alignSelf: 'flex-start',
    color: COLORS.ON_PRIMARY,
    marginLeft: GUTTER_SIZE * 4,
    marginTop: GUTTER_SIZE,
  },
  passwordText: {
    textTransform: 'lowercase',
    textDecorationLine: 'underline',
  },
  inputTopMargin: { marginTop: GUTTER_SIZE * 3 },
  rulesText: {
    marginLeft: GUTTER_SIZE * 4,
    marginTop: GUTTER_SIZE,
    textTransform: 'lowercase',
    alignSelf: 'flex-start',
  },
});
