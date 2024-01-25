import React, { FC } from 'react';
import { BottomSheetWrapper } from 'components/BottomSheetWrapper';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { VoidFunction } from 'core/interfaces';
import { Button } from 'components/Button';

import { PATHS } from 'constants/PATHS';

import { SPINNER_CONTAINER_SIZE, styles } from './Verification.styles';

interface Props {
  isInitError: boolean;
  onPressTryAgain: VoidFunction;
}

export const VerificationPresenter: FC<Props> = ({
  isInitError,
  onPressTryAgain,
}) => {
  const { t } = useTranslation();
  return (
    <BottomSheetWrapper screenKey={PATHS.VERIFICATION}>
      <View style={styles.container}>
        <View style={styles.spinnerContainer}>
          {!isInitError && (
            <LoadingSpinner
              height={SPINNER_CONTAINER_SIZE}
              borderWidth={4}
              backgroundColor={COLORS.LIGHT_BACKGROUND}
              containerStyles={styles.spinner}
            />
          )}
        </View>
        <Text style={[TEXT_VARIANTS.font20, styles.text]}>
          {isInitError
            ? t('SOMETHING_WENT_WRONG')
            : t('LOADING_VERIFICATION_DESC')}
        </Text>
        <View style={styles.buttonContainer}>
          {isInitError && (
            <Button
              text={t('TRY_AGAIN')}
              containerStyles={styles.tryAgainBtn}
              onPress={onPressTryAgain}
            />
          )}
        </View>
      </View>
    </BottomSheetWrapper>
  );
};
