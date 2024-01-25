import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './Promotions.styles';
import { PromotionsPresenterProps } from './Promotions.types';

export const PromotionsPresenter: FC<PromotionsPresenterProps> = ({}) => (
  <View style={styles.container}>
    <Text style={styles.text}>Promotions</Text>
  </View>
);
