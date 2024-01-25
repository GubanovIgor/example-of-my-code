import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  bg: {
    width: '100%',
    height: 200,
  },
  img: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT / 8.5,
  },
  mask: {
    position: 'absolute',
    top: 24,
  },
  maskText: {
    textAlign: 'center',
  },
  separator: {
    width: '100%',
    borderColor: COLORS.TAMARIND_SEPARATOR,
    borderBottomWidth: 4,
    borderRadius: 2,
    marginTop: -48,
  },
  logo: {
    marginTop: GUTTER_SIZE * 3,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: GUTTER_SIZE * 7,
  },
  textTitileWrapper: {
    textAlign: 'left',
    textTransform: 'none',
  },
  timeTitleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DARK_BACKGROUND,
    width: 58,
    height: 31,
    borderRadius: 12,
  },
  text: {
    width: '100%',
    marginTop: GUTTER_SIZE * 8,
  },
  button: {
    marginTop: GUTTER_SIZE * 3,
  },
  supportEmailWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginTop: GUTTER_SIZE * 7,
  },
  supportEmail: {
    marginLeft: GUTTER_SIZE,
    textDecorationLine: 'underline',
  },
  otherEmailsTitle: {
    width: '100%',
    color: COLORS.TEXT_GRAY,
    marginTop: GUTTER_SIZE * 17,
  },
  email: {
    width: '100%',
    color: COLORS.TEXT_GRAY,
    textDecorationLine: 'underline',
  },
});
