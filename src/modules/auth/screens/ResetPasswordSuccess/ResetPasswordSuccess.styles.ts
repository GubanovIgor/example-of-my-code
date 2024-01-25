import { StyleSheet } from 'react-native';
import { COLORS, GUTTER_SIZE, SPACING } from 'config/theme';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  title: {
    marginLeft: SPACING.M,
    marginBottom: SPACING.XXL,
  },
  subTitle: {
    color: COLORS.TEXT_LIGHT,
    marginTop: GUTTER_SIZE,
  },
  content: {
    alignItems: 'center',
  },
  scrollContent: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.M,
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
