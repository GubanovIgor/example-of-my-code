import { GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  field: {
    width: SCREEN_WIDTH - GUTTER_SIZE * 6,
    marginTop: GUTTER_SIZE * 4,
  },
});
