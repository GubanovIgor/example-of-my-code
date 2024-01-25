import React from 'react';
import { Text, View } from 'react-native';
import FirstPlaceIcon from 'assets/icons/firstPlace.svg';
import SecondPlaceIcon from 'assets/icons/secondPlace.svg';
import ThirdPlaceIcon from 'assets/icons/thirdPlace.svg';
import { TEXT_VARIANTS } from 'config/theme';

import { styles } from './LeaderBoardtem.styles';

export const getPedestalIcons = (position: string) => {
  switch (position) {
    case '1':
      return (
        <View style={styles.flex1}>
          <FirstPlaceIcon />
        </View>
      );
    case '2':
      return (
        <View style={styles.flex1}>
          <SecondPlaceIcon />
        </View>
      );
    case '3':
      return (
        <View style={styles.flex1}>
          <ThirdPlaceIcon />
        </View>
      );
    default:
      return (
        <Text style={[TEXT_VARIANTS.font14, styles.flex1]}>{position}</Text>
      );
  }
};
