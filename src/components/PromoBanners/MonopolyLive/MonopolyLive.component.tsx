import { TEXT_VARIANTS } from 'config/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { styles } from './MonopolyLive.styles';

const BG_PATH = require('assets/promoBanners/monopolyLong/bg-monopoly-long-mobile.png');
const IMAGE_PATH = require('assets/promoBanners/monopolyLong/monopoly-long-img-mobile.png');

export const MonopolyLive = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FastImage source={BG_PATH} style={styles.bg} />
      <FastImage source={IMAGE_PATH} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={[TEXT_VARIANTS.font14Bold, styles.title]}>
          {t('MONOPOLY_BANNER.TITLE')}
        </Text>
        <Text style={[TEXT_VARIANTS.font12, styles.text]}>
          {t('MONOPOLY_BANNER.TEXT')}
        </Text>
      </View>
    </View>
  );
};
