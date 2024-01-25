import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from 'config/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  depositMethodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: SPACING.M,
  },
  depositMethodContainer: {
    width: 351,
  },
  attentionContainer: {
    backgroundColor: COLORS.ATTENTION_BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.ATTENTION_BORDER,
    height: 55,
    width: 351,
    padding: 8,
    borderRadius: 4,
    marginTop: SPACING.XS,
  },
  attentionText: {
    textAlign: 'center',
  },
});
