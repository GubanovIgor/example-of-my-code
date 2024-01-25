import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from 'config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SPACING.XL,
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gamesPaginationContainer: { justifyContent: 'space-around' },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.M,
    paddingHorizontal: SPACING.M,
    justifyContent: 'space-between',
  },
  arrowToRightIconContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    width: 48,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.TEXT_LIGHT,
  },
});
