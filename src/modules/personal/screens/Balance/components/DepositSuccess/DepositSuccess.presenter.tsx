import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { TEXT_VARIANTS } from 'config/theme';
import successImg from 'assets/images/successImg.png';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/Button';

import { styles } from './DepositSuccess.styles';

interface Props {
  onPressClose: () => void;
}

export const DepositSuccessPresenter = ({ onPressClose }: Props) => {
  const { t } = useTranslation();
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[TEXT_VARIANTS.font24Bold, styles.title]}>
            {t('SUCCESS')}
          </Text>
          <FastImage
            resizeMode="contain"
            source={successImg}
            style={styles.image}
          />
          <Text style={[TEXT_VARIANTS.font14, styles.text]}>
            {t('DEPOSIT_REQUEST')}
          </Text>
          <Text style={[TEXT_VARIANTS.font14]}>
            {t('MONEY_HAVE_BEEN_PLACED')}
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
};
