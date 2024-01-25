import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DARK_BACKGROUND,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: GUTTER_SIZE * 3,
  },
  infoView: {
    padding: GUTTER_SIZE * 5,
  },
  title: {
    color: COLORS.TEXT_GRAY,
    textTransform: 'none',
    marginBottom: GUTTER_SIZE + 2,
  },
  value: {},
  depositWithdrawalView: {
    position: 'absolute',
    bottom: 28,
    right: -20,
    height: 86,
    width: 86,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
