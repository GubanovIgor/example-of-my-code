import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    paddingTop: GUTTER_SIZE * 2,
    alignItems: 'center',
    width: SCREEN_WIDTH - GUTTER_SIZE * 6,
    marginHorizontal: GUTTER_SIZE * 3,
  },
  section: {
    width: '100%',
    backgroundColor: COLORS.DARK_BACKGROUND,
    borderRadius: 12,
    marginBottom: GUTTER_SIZE * 6,
  },
  sectionTitle: {
    width: '100%',
    marginTop: GUTTER_SIZE * 4,
    marginLeft: GUTTER_SIZE * 3,
  },
  collapsibleCardContainer: {
    borderRadius: 12,
    border: 'none',
  },
});
