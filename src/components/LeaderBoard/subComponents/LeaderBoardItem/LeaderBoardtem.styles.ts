import { GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - GUTTER_SIZE * 6,
    flexDirection: 'row',
    padding: GUTTER_SIZE * 3,
  },
  flex1: {
    flex: 1,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
});
