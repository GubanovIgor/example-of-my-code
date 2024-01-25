import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  button: {
    flex: 1,
  },
  buttonLeftMargin: {
    marginLeft: GUTTER_SIZE * 2,
  },
  btnText: {
    textTransform: 'uppercase',
  },
  title: {
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
  },
  infoText: {
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
    marginTop: GUTTER_SIZE * 6,
    marginBottom: GUTTER_SIZE * 8,
  },
  textContainer: {
    paddingHorizontal: GUTTER_SIZE * 8,
  },
});
