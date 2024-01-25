import { COLORS, GUTTER_SIZE, SPACING } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - GUTTER_SIZE * 5,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    paddingHorizontal: GUTTER_SIZE * 3,
    borderRadius: 12,
  },
  captionText: {
    marginLeft: SPACING.L,
    marginTop: SPACING.XS,
    color: COLORS.TEXT_DANGER,
  },
  inputDanger: {
    backgroundColor: COLORS.DANGER_BACKGROUND,
  },
  placeholderContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    padding: SPACING.XS,
    borderRadius: 4,
    zIndex: 2,
  },
});
