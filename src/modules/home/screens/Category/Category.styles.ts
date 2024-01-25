import { GUTTER_SIZE, SPACING } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

const inputsAmountInRow = 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.M,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: GUTTER_SIZE * 3,
  },
  headerTitle: {
    marginLeft: GUTTER_SIZE * 3,
  },
  filterSection: {
    paddingHorizontal: SPACING.M,
    width: '100%',
    flexDirection: 'row',
    marginTop: GUTTER_SIZE * 3,
    justifyContent: 'space-between',
  },
  customSelector: {
    width: (SCREEN_WIDTH - GUTTER_SIZE * 9) / inputsAmountInRow,
  },
  subCategoriesSection: {
    marginTop: GUTTER_SIZE * 4,
    paddingLeft: SPACING.M,
  },
  selectorInput: {
    height: 40,
    width: (SCREEN_WIDTH - GUTTER_SIZE * 10) / 2,
  },
});
