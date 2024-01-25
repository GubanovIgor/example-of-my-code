import { StyleSheet } from 'react-native';
import { GUTTER_SIZE, SPACING } from 'config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'Century Gothic',
    color: '#fff',
    fontSize: 40,
  },
  headerSection: {
    paddingLeft: SPACING.M,
  },
  logosContainer: {
    marginBottom: GUTTER_SIZE * 5,
  },
  logo: {
    width: 46,
    height: 46,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  providersContainer: {
    paddingTop: GUTTER_SIZE * 8,
  },
});
