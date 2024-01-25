import { BUTTONS_HEIGHTS, COLORS, FONTS } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contained: {
    width: '100%',
    height: BUTTONS_HEIGHTS.DEFAULT,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  transparent: {
    width: '100%',
    height: BUTTONS_HEIGHTS.DEFAULT,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  outlined: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    height: BUTTONS_HEIGHTS.DEFAULT,
    borderColor: COLORS.PRIMARY,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONTS.mainFontBold,
    fontSize: 14,
    textTransform: 'uppercase',
    color: COLORS.TEXT_LIGHT,
  },
  disabled: {
    opacity: 0.2,
  },
});
