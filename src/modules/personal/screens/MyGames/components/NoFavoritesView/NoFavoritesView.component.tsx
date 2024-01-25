import React, { FC } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import noFavoritesImg from 'assets/images/noFavorites.png';
import { TEXT_VARIANTS } from 'config/theme';
import { useTranslation } from 'react-i18next';

import { styles } from './NoFavoritesView.styles';

export const NoFavoritesView: FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <FastImage
        resizeMode="contain"
        source={noFavoritesImg}
        style={styles.image}
      />
      <Text style={[TEXT_VARIANTS.font14, styles.text]}>
        {t('NO_FAVORITES_TEXT')}
      </Text>
    </View>
  );
};
