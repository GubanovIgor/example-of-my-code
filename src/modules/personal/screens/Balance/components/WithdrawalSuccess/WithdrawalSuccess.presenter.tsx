import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { TEXT_VARIANTS } from 'config/theme';
import successImg from 'assets/images/successImg.png';
import { GetTranslationValue } from 'core/interfaces';
import { Button } from 'components/Button';

import { styles } from './WithdrawalSuccess.styles';

interface Props {
  onPressClose: () => void;
  t: GetTranslationValue;
}

export const WithdrawalSuccessPresenter = ({ onPressClose, t }: Props) => (
  <ScrollView
    contentContainerStyle={styles.scrollContent}
    keyboardShouldPersistTaps="always"
  >
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[TEXT_VARIANTS.font24Bold, styles.title]}>Success</Text>
        <FastImage
          resizeMode="contain"
          source={successImg}
          style={styles.image}
        />
        <Text style={[TEXT_VARIANTS.font14, styles.text, styles.textAlign]}>
          {t('CONFIRM_EMAIL_ADDRESS')}
        </Text>
        <Text style={[TEXT_VARIANTS.font14, styles.textAlign]}>
          {t('CHECK_PAYMENT_STATUS')} {t('BOOKINGS_PAGE')}
        </Text>
      </View>
      <Button
        text={t('OK')}
        containerStyles={styles.btnContainer}
        onPress={onPressClose}
      />
    </View>
  </ScrollView>
);
