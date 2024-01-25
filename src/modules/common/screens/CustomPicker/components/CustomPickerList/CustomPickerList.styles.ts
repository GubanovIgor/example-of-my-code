import { GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: '100%',
    paddingHorizontal: GUTTER_SIZE * 6,
  },
  itemValue: { textTransform: 'none' },
  itemContainer: {
    paddingVertical: GUTTER_SIZE * 2,
  },
  itemCentered: { alignItems: 'center' },
});
