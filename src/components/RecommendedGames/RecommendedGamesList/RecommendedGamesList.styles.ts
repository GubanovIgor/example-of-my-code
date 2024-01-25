import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: GUTTER_SIZE * 8,
  },
  horizontalMargin: {
    marginHorizontal: 0,
  },
  title: {
    marginBottom: GUTTER_SIZE * 4,
    color: COLORS.TEXT_LIGHT,
  },
  gamesView: {
    paddingHorizontal: GUTTER_SIZE * 3,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
