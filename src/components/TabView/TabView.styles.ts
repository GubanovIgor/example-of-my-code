import { StyleSheet } from 'react-native';
import { COLORS } from 'config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tabViewContainer: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    width: 351,
    height: 28,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
  },
  indicator: {
    width: 172,
    height: 22,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    zIndex: -1,
    top: -25,
    left: 3,
  },
});
