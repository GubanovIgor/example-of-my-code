import { StyleSheet } from 'react-native';
import { GUTTER_SIZE } from 'config/theme';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: '100%',
    paddingHorizontal: GUTTER_SIZE * 3,
  },
});
