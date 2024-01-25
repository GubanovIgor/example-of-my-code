import { TEXT_VARIANTS } from 'config/theme';
import React from 'react';
import { View, Text } from 'react-native';

import { getPedestalIcons } from './LeaderBoardItem.helpers';
import { styles } from './LeaderBoardtem.styles';

export const LeaderBoardItem = ({ data }) => {
  const { position, name, points, prize } = data;

  return (
    <View style={styles.container}>
      {getPedestalIcons(position)}
      <Text style={[TEXT_VARIANTS.font14, styles.flex4]}>{name}</Text>
      <Text style={[TEXT_VARIANTS.font14, styles.flex3]}>{points}</Text>
      <Text style={[TEXT_VARIANTS.font14, styles.flex3]}>{prize}</Text>
    </View>
  );
};
