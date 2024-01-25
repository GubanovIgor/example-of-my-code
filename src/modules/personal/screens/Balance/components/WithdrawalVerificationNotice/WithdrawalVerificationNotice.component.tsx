import React, { FC } from 'react';
import { TEXT_VARIANTS } from 'config/theme';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { View, Text } from 'react-native';
import { Button } from 'components/Button';

import { styles } from './WithdrawalVerificationNotice.styles';

interface WithdrawalVerificationNoticeNoticeProps {
  t: GetTranslationValue;
  onPressVerify: VoidFunction;
  isLoading: boolean;
}

export const WithdrawalVerificationNoticeNotice: FC<
  WithdrawalVerificationNoticeNoticeProps
> = ({ t, onPressVerify, isLoading }) => (
  <>
    <View style={styles.opacityContainer} />
    <View style={styles.container}>
      <Text style={[TEXT_VARIANTS.font14, styles.textStyle]}>
        {t('PLEASE_COMPLETE_ACCOUNT_INFORMATION')}
      </Text>
      <Button
        text={t('GET_VERIFIED')}
        isLoading={isLoading}
        containerStyles={styles.verifyBtn}
        onPress={onPressVerify}
      />
    </View>
  </>
);
