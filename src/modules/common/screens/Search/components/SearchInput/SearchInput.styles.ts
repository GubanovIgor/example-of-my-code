import { GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingLeft: GUTTER_SIZE * 3,
  },
  cancelBtn: {
    marginRight: GUTTER_SIZE * 5,
  },
  crossBtn: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  cancelBtnText: {
    marginLeft: GUTTER_SIZE * 3,
  },
  input: {
    flex: 1,
  },
});
