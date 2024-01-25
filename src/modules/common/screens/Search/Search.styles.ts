import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  randomGameBtn: {
    height: 36,
    alignSelf: 'flex-start',
    paddingHorizontal: GUTTER_SIZE * 5,
    borderRadius: 12,
    backgroundColor: COLORS.OPTIONS_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: GUTTER_SIZE * 2,
    marginLeft: GUTTER_SIZE * 3,
  },
  recommendedText: {
    marginLeft: GUTTER_SIZE * 3,
    marginTop: GUTTER_SIZE * 7,
  },
});
