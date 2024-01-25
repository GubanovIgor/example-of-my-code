import { StyleSheet } from 'react-native';
import { COLORS, GUTTER_SIZE, SPACING } from 'config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputsContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SPACING.M,
  },
  confirmButtonContainer: {
    width: '100%',
  },
  title: {
    marginLeft: SPACING.M,
    marginBottom: SPACING.XXL,
  },
  text: {
    fontFamily: 'Century Gothic',
    color: '#fff',
    fontSize: 40,
  },
  editIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 71,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY,
    right: 4,
    top: 4,
    zIndex: 1,
  },
  resendCodeContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY,
    right: 4,
    top: 4,
  },
  confirmButton: {
    marginTop: GUTTER_SIZE * 8,
  },
  disabledCodeContainer: {
    opacity: 0.5,
  },
});
