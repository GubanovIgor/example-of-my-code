import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: GUTTER_SIZE * 5,
    paddingHorizontal: GUTTER_SIZE * 3,
  },
  providersContainer: {
    paddingTop: 0,
  },
  gamesListContainer: { width: SCREEN_WIDTH - GUTTER_SIZE * 6, height: '100%' },
  providersListContainer: {
    width: SCREEN_WIDTH - GUTTER_SIZE,
    height: '100%',
  },
  tabBarLabel: {
    color: COLORS.ON_PRIMARY,
    textTransform: 'none',
  },
  gamesContentContainer: { paddingHorizontal: 0, paddingVertical: 0 },
  tabStyle: {
    width: SCREEN_WIDTH / 2 - 12,
    paddingHorizontal: 0,
    borderRadius: 8,
    borderWidth: 1,
    height: 22,
    paddingTop: 0,
  },
  indicator: {
    width: 0,
  },
  tabContainer: {
    height: 28,
    backgroundColor: COLORS.BACKGROUND,
    marginHorizontal: GUTTER_SIZE * 3,
  },
  emptyComponent: { alignItems: 'center', paddingTop: GUTTER_SIZE * 10 },
  noProvidersText: { color: COLORS.TEXT_LIGHT },
});
