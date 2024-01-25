import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 2,
    flex: 1,
    paddingHorizontal: GUTTER_SIZE * 3,
    width: SCREEN_WIDTH,
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
  itemContainer: {},
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.GRAY_BORDER_50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: GUTTER_SIZE * 4,
  },
  infoContainer: {
    height: 62,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSide: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    color: COLORS.ON_PRIMARY,
  },
  createdDate: {
    marginTop: GUTTER_SIZE,
    color: COLORS.TEXT_GRAY,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionIdDetailsMargin: {
    marginTop: GUTTER_SIZE * 2,
  },
  transactionIdDetails: {
    paddingLeft: GUTTER_SIZE * 13,
    paddingRight: GUTTER_SIZE * 7,
  },
  transactionType: { textTransform: 'capitalize' },
});
