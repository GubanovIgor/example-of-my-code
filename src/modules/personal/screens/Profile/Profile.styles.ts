import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: GUTTER_SIZE * 3,
    paddingHorizontal: GUTTER_SIZE * 5,
  },
  text: {
    fontFamily: 'Century Gothic',
    color: '#fff',
    fontSize: 40,
  },
  previewInfoContainer: {
    marginBottom: GUTTER_SIZE,
  },
  supportText: { color: COLORS.TEXT_LIGHT, textTransform: 'none' },
  supportTextActive: { color: COLORS.PRIMARY, textDecorationLine: 'underline' },
  separator: {
    borderColor: COLORS.OPTIONS_BACKGROUND,
    marginHorizontal: 0,
    marginVertical: GUTTER_SIZE * 4,
  },
});
