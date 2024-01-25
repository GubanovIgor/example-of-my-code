import React, { FC } from 'react';
import { TEXT_VARIANTS } from 'config/theme';
import { GetTranslationValue } from 'core/interfaces';
import { View, Text, Linking } from 'react-native';

import { SUPPORT_URL } from 'constants/URLS';

import { styles } from './BalanceContactUsNotice.styles';

interface BalanceContactUsNoticeProps {
  t: GetTranslationValue;
}

export const BalanceContactUsNotice: FC<BalanceContactUsNoticeProps> = ({
  t,
}) => {
  const onPressSupportEmail = () => {
    Linking.openURL(`mailto:${SUPPORT_URL}`);
  };
  return (
    <>
      <View style={styles.opacityContainer} />
      <View style={styles.textContainer}>
        <Text style={[TEXT_VARIANTS.font16Bold, styles.textStyle]}>
          {t('ISSUE_WITH_REQUEST')}
        </Text>
        <Text
          onPress={onPressSupportEmail}
          style={[TEXT_VARIANTS.font14, styles.textStyle]}
        >
          {t('PLEASE_CONTACT')}
          <Text style={styles.supportText}>{` ${SUPPORT_URL}\n`}</Text>
          {t('FOR_DETAILS')}
        </Text>
      </View>
    </>
  );
};
