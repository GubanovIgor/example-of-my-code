import { COLORS } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 0,
  },
  moreProvidersText: {
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  scrollViewContainer: {
    flex: 1,
  },
  providersListContainer: { paddingTop: 0 },
});
