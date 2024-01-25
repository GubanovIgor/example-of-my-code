import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { COLORS, GUTTER_SIZE, TEXT_VARIANTS } from '../config/theme';
import LogOutIcon from '../assets/icons/logOut.svg';
import { useAuthStore } from '../store/authStore';

export const LogOutButton = () => {
  const { logout } = useAuthStore((state) => state);

  const { t } = useTranslation();

  const onPressLogout = () => {
    logout();
  };
  return (
    <>
      <TouchableOpacity onPress={onPressLogout} style={styles.logOutContainer}>
        <LogOutIcon width={22} height={22} fill={COLORS.DRAWER_ICON} />
        <Text style={[TEXT_VARIANTS.font16, styles.logOutTitle]}>
          {t('LOG_OUT')}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  logOutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom: GUTTER_SIZE * 5,
  },
  logOutTitle: {
    color: COLORS.TEXT_LIGHT,
    marginLeft: GUTTER_SIZE * 4,
  },
});
