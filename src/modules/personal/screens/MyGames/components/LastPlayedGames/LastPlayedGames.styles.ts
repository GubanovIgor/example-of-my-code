import { GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: SCREEN_WIDTH,
  },
  noLastPlayedGamesView: {
    alignItems: 'center',
  },
  noLastPlayedGamesText: {
    marginTop: GUTTER_SIZE * 10,
  },
});
