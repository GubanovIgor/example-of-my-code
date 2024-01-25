import { COLORS, GUTTER_SIZE } from 'config/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingHorizontal: GUTTER_SIZE * 2,
    paddingVertical: GUTTER_SIZE - 2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: GUTTER_SIZE,
  },
  status: { textTransform: 'none', lineHeight: 10 },
  acceptedContainer: {
    backgroundColor: COLORS.ACCEPTED_STATUS_BG,
    borderColor: COLORS.ACCEPTED_STATUS_BORDER,
  },
  rejectedContainer: {
    backgroundColor: COLORS.REJECTED_STATUS_BG,
    borderColor: COLORS.REJECTED_STATUS_BORDER,
  },
  pendingContainer: {
    backgroundColor: COLORS.PENDING_STATUS_BG,
    borderColor: COLORS.PENDING_STATUS_BORDER,
  },
  hideContainer: {
    display: 'none',
  },
});
