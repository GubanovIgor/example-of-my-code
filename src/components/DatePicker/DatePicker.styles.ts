import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

import { ITEM_HEIGHT } from './DatePicker.constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  blueLine: {
    marginHorizontal: 12,
    borderColor: COLORS.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    top: ITEM_HEIGHT * 2,
    height: ITEM_HEIGHT,
  },
  selectedIndicator: {
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  itemText: {
    textTransform: 'capitalize',
    color: COLORS.WHITE,
  },
  monthItem: {
    alignItems: 'flex-start',
    paddingLeft: GUTTER_SIZE * 4,
  },
  monthContainer: { width: SCREEN_WIDTH / 2 },
  dayContainer: {
    width: SCREEN_WIDTH / 4 - 10,
  },
  yearContainer: {
    width: SCREEN_WIDTH / 4,
  },
  buttonContainer: {
    paddingHorizontal: GUTTER_SIZE * 3,
    paddingTop: GUTTER_SIZE * 6,
  },
});
