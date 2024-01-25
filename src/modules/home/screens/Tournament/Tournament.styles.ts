import { GUTTER_SIZE, SPACING } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: SPACING.M,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: GUTTER_SIZE * 3,
  },
  headerTitle: {
    marginLeft: GUTTER_SIZE * 3,
  },
  text: {
    fontFamily: 'Century Gothic',
    color: '#fff',
    fontSize: 40,
  },
});
