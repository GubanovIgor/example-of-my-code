import { COLORS, GUTTER_SIZE, SPACING } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - GUTTER_SIZE * 5,
  },
  inputContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.L,
  },
  inputText: {
    width: '100%',
  },
  itemListContainer: {
    width: '100%',
    height: 184,
    backgroundColor: COLORS.MIDDLE_BACKGROUND,
    borderRadius: 12,
    paddingHorizontal: SPACING.XL,
    paddingVertical: SPACING.L,
  },
  itemList: {
    width: SCREEN_WIDTH,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.L,
  },
  captionText: {
    marginLeft: SPACING.L,
    marginTop: SPACING.XS,
    color: COLORS.TEXT_DANGER,
  },
});
