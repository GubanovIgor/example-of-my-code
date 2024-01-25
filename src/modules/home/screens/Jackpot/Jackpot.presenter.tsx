import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { styles } from './Jackpot.styles';
import { JackpotPresenterProps } from './Jackpot.types';

export const JackpotPresenter: FC<JackpotPresenterProps> = ({}) => (
  <View style={styles.container}>
    <Text style={styles.text}>Jackpot</Text>
  </View>
);
