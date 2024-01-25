import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: COLORS.DARK4,
    paddingTop: GUTTER_SIZE * 12,
  },
  handleStyle: {
    width: 70,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.DRAG_LINE,
  },
});
