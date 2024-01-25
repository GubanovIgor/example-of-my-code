import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { useTranslation } from 'react-i18next';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';

import { PATHS } from 'constants/PATHS';

import { WithdrawalSuccessPresenter } from './WithdrawalSuccess.presenter';

export const WithdrawalSuccessContainer = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const handlePresssOnClose = () => {
    navigation.goBack();
    navigation.pop();
  };

  return (
    <BottomSheetWrapper screenKey={PATHS.WITHDRAWAL_SUCCESS}>
      <WithdrawalSuccessPresenter onPressClose={handlePresssOnClose} t={t} />
    </BottomSheetWrapper>
  );
};
