import { GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sectionItemContainer: {
    paddingVertical: GUTTER_SIZE * 2,
    paddingHorizontal: GUTTER_SIZE * 5,
  },
  sectionItemText: {
    textTransform: 'none',
  },
});
