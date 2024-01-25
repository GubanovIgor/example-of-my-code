import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

import { COLORS, GUTTER_SIZE } from '../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: GUTTER_SIZE * 20,
  },
  refreshBtn: {
    marginBottom: 100,
    width: SCREEN_WIDTH - 24,
  },
  refreshBtnText: {
    color: COLORS.ON_PRIMARY,
    textTransform: 'uppercase',
  },
  errorMsg: {
    color: COLORS.ON_PRIMARY,
    marginTop: GUTTER_SIZE * 15,
    textAlign: 'center',
    marginBottom: GUTTER_SIZE * 8,
  },
});
