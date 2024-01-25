import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  separator: {
    marginBottom: GUTTER_SIZE * 2,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  amountView: {
    marginRight: GUTTER_SIZE * 4,
    alignItems: 'flex-end',
  },
  itemContainer: {
    paddingHorizontal: GUTTER_SIZE * 3,
    paddingVertical: GUTTER_SIZE * 4,
    backgroundColor: COLORS.DARK_BACKGROUND,
    borderRadius: 12,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: GUTTER_SIZE * 4,
  },
  infoContainer: {},
  leftSide: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    color: COLORS.ON_PRIMARY,
  },
  date: {
    marginRight: GUTTER_SIZE * 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowNoSpace: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIdDetailsMargin: {
    marginTop: GUTTER_SIZE * 2,
  },
  gameDetials: {
    marginBottom: GUTTER_SIZE * 4,
  },
  payout: { color: COLORS.TEXT_LIGHT },
  transactionType: { textTransform: 'capitalize' },
  topView: {
    marginBottom: GUTTER_SIZE * 4,
  },
  noDataTitle: {
    marginBottom: GUTTER_SIZE * 10,
    color: COLORS.TEXT_LIGHT,
  },
  noDataDesc: {
    color: COLORS.TEXT_LIGHT,
  },
});
