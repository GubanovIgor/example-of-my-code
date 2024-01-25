import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { TEXT_VARIANTS } from 'config/theme';
import successImg from 'assets/images/successImg.png';
import { Button } from 'components/Button';

import { ResetPasswordSuccessPresenterProps } from './ResetPasswordSuccess.types';
import { styles } from './ResetPasswordSuccess.styles';

export const ResetPasswordSuccessPresenter: FC<
  ResetPasswordSuccessPresenterProps
> = ({ onPressClose, t }) => (
  <>
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[TEXT_VARIANTS.font16Bold, styles.subTitle]}>
            {t('PASSWORD_RECOVERY.NEW_PASSWORD_SET')}
          </Text>
          <Text style={TEXT_VARIANTS.font14}>
            {t('PASSWORD_RECOVERY.CAN_LOGIN_TO_ACCOUNT')}
          </Text>
          <FastImage
            resizeMode="contain"
            source={successImg}
            style={styles.image}
          />
        </View>
        <Button
          containerStyles={styles.btnContainer}
          text={t('CLOSE')}
          onPress={onPressClose}
        />
      </View>
    </ScrollView>
  </>
);
