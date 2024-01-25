import { StyleSheet } from 'react-native';
import { COLORS, GUTTER_SIZE, SPACING } from 'config/theme';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  scrollContent: { flex: 1 },
  title: {
    color: COLORS.SUCCESS,
    marginTop: GUTTER_SIZE * 18,
  },
  content: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.M,
  },
  text: {
    marginTop: GUTTER_SIZE * 18,
    marginBottom: GUTTER_SIZE * 3,
  },
  btnContainer: {
    marginVertical: GUTTER_SIZE * 8,
  },
  image: {
    marginTop: GUTTER_SIZE * 8,
    width: SCREEN_WIDTH - GUTTER_SIZE * 18,
    height: SCREEN_WIDTH - GUTTER_SIZE * 24,
  },
});
