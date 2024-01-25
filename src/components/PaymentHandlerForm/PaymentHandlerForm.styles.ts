import { StyleSheet } from 'react-native';
import { GUTTER_SIZE } from 'config/theme';

export const styles = StyleSheet.create({
  paymentContainer: {
    height: '100%',
    alignItems: 'center',
    paddingTop: GUTTER_SIZE,
  },
  paymentButton: {
    marginVertical: GUTTER_SIZE * 8,
  },
  paymentButtonContainer: {
    width: '100%',
  },
});
