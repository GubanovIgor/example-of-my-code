import { COLORS, GUTTER_SIZE, SPACING } from 'config/theme';
import { StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 2,
  },
  inputContainer: { flex: 1 },
  countryCode: {
    marginHorizontal: GUTTER_SIZE * 2,
  },
  phoneSelectorContainer: {
    width: 'auto',
  },
  phoneInput: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.L,
  },
  hiddenPhoneInput: {
    position: 'absolute',
    width: '100%',
    height: 40,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.L,
    color: 'transparent',
    zIndex: 1,
  },
  phoneInputDanger: {
    backgroundColor: COLORS.DANGER_BACKGROUND,
  },
  phoneSelector: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.L,
  },
  phonePlaceholder: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    padding: SPACING.XS,
  },
  phonesListContainer: {
    width: SCREEN_WIDTH - SPACING.M * 2,
    height: 184,
    backgroundColor: COLORS.MIDDLE_BACKGROUND,
    borderRadius: 12,
    marginTop: SPACING.XS,
  },
  phonesList: {
    width: SCREEN_WIDTH - SPACING.M * 2,
  },
  phoneItemContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.L,
  },
  phoneAndCountryContainer: {
    marginLeft: SPACING.S,
    marginRight: SPACING.L,
    width: 40,
  },
  helpText: {
    marginLeft: SPACING.L,
    marginTop: SPACING.XS,
  },
  captionText: {
    marginLeft: SPACING.L,
    marginTop: SPACING.XS,
    color: COLORS.TEXT_DANGER,
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
  },
  placeholderContainer: {
    position: 'absolute',
    top: -9,
    left: 10,
    backgroundColor: COLORS.LIGHT_BACKGROUND,
    padding: SPACING.XS,
    borderRadius: 4,
    zIndex: 2,
  },
});
