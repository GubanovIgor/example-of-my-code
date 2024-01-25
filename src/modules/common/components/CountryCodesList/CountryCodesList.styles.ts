import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  phoneItemContainer: {
    flexDirection: 'row',
    marginBottom: GUTTER_SIZE * 4,
  },
  phoneAndCountryContainer: {
    marginLeft: GUTTER_SIZE * 2,
    marginRight: GUTTER_SIZE * 4,
    width: 40,
  },
  contentContainer: {
    paddingHorizontal: GUTTER_SIZE * 6,
    paddingVertical: GUTTER_SIZE * 4,
  },
  itemText: {
    color: COLORS.ON_PRIMARY,
  },
});
