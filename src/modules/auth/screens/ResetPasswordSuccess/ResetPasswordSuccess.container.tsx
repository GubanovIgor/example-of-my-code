import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { useTranslation } from 'react-i18next';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';

import { PATHS } from 'constants/PATHS';

import { ResetPasswordSuccessPresenter } from './ResetPassword.presenter';

export const ResetPasswordSuccessContainer = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();

  const handlePresssOnClose = () => {
    navigation.pop();
  };

  return (
    <BottomSheetWrapper
      screenKey={PATHS.RESET_PASSWORD_SUCCESS}
      title={t('PASSWORD_RECOVERY.NEW_PASSWORD')}
    >
      <ResetPasswordSuccessPresenter t={t} onPressClose={handlePresssOnClose} />
    </BottomSheetWrapper>
  );
};
