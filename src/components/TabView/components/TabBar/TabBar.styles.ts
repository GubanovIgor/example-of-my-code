import { StyleSheet } from 'react-native';
import { COLORS } from 'config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabViewContainer: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    height: 28,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
  },
  indicator: {
    height: 22,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    zIndex: -1,
    top: -25,
    left: 3,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    marginBottom: 1,
  },
});
