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
  subTitle: {
    width: '100%',
    textTransform: 'none',
    marginTop: GUTTER_SIZE * 7,
  },
  text: {
    width: '100%',
    marginTop: GUTTER_SIZE * 8,
  },
  finalWordsWrapper: {
    flexDirection: 'row',
    marginTop: GUTTER_SIZE * 8,
  },
});
