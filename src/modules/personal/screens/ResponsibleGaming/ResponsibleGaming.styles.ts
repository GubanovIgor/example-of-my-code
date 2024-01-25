import { GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: GUTTER_SIZE * 3,
    paddingTop: GUTTER_SIZE * 4,
  },
});
