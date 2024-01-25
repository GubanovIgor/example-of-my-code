import { useNavigation } from '@react-navigation/native';
import { KYSService } from 'core/services';
import React, { FC, useEffect, useState } from 'react';

import { VerificationPresenter } from './Verification.presenter';

export const VerificationContainer: FC = ({}) => {
  const navigation = useNavigation();
  const [isInitError, setIsInitError] = useState(false);

  const handleOnSuccessKYCInit = () => {
    if (isInitError) setIsInitError(false);

    navigation.goBack();
  };
  const handleOnErrorKYCInit = () => {
    setIsInitError(true);
  };

  const initKYCService = () => {
    if (isInitError) setIsInitError(false);

    KYSService.init({
      onSuccess: handleOnSuccessKYCInit,
      onError: handleOnErrorKYCInit,
    });
  };

  useEffect(() => {
    KYSService.init({
      onSuccess: handleOnSuccessKYCInit,
      onError: handleOnErrorKYCInit,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VerificationPresenter
      onPressTryAgain={initKYCService}
      isInitError={isInitError}
    />
  );
};
