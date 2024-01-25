import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const SPINNER_CONTAINER_SIZE = 68;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  text: {
    textAlign: 'center',
    color: COLORS.ON_PRIMARY,
    marginTop: GUTTER_SIZE * 10,
  },
  spinner: {
    flex: 0,
    height: 'auto',
  },
  spinnerContainer: {
    width: SPINNER_CONTAINER_SIZE,
    height: SPINNER_CONTAINER_SIZE,
  },
  tryAgainBtn: {
    marginTop: GUTTER_SIZE * 8,
  },
  buttonContainer: {
    width: '100%',
  },
});
