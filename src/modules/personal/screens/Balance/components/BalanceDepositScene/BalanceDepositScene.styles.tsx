import { GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  paymentHandlerFormContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: GUTTER_SIZE * 3,
    zIndex: 99999,
    elevation: 10,
  },
});
