import { TEXT_VARIANTS } from 'config/theme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { styles } from './CrazyTime.styles';

const BG_PATH = require('assets/promoBanners/crazyTime/bg-crazy-time-mobile.png');
const IMAGE_PATH = require('assets/promoBanners/crazyTime/crazy-time-img-mobile.png');

export const CrazyTime = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FastImage source={BG_PATH} style={styles.bg} />
      <FastImage source={IMAGE_PATH} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={[TEXT_VARIANTS.font14Bold, styles.title]}>
          {t('CRAZY_TIME_BANNER.TITLE')}
        </Text>
        <Text style={[TEXT_VARIANTS.font12, styles.text]}>
          {t('CRAZY_TIME_BANNER.TEXT')}
        </Text>
      </View>
    </View>
  );
};
