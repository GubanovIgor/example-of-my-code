import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';

import { PATHS } from 'constants/PATHS';

import { DepositSuccessPresenter } from './DepositSuccess.presenter';

export const DepositSuccessContainer = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePresssOnClose = () => {
    navigation.goBack();
  };

  return (
    <BottomSheetWrapper screenKey={PATHS.DEPOSIT_SUCCESS}>
      <DepositSuccessPresenter onPressClose={handlePresssOnClose} />
    </BottomSheetWrapper>
  );
};
