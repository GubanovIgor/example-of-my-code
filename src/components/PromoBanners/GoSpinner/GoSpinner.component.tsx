import { Button } from 'components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { styles } from './GoSpinner.styles';

const BG_PATH = require('assets/promoBanners/goSpinner/bg-go-spinner-mobile-tablet.png');

export const GoSpinner = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FastImage source={BG_PATH} style={styles.bg} resizeMode="stretch" />
      <Button
        text={t('PLAY')}
        containerStyles={styles.button}
      />
    </View>
  );
};
