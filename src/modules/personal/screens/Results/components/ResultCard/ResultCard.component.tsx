import { TEXT_VARIANTS } from 'config/theme';
import React, { FC, ReactNode } from 'react';
import { Text, View } from 'react-native';

import { styles } from './ResultCard.styles';

interface Props {
  title: string;
  value: string;
  icon?: ReactNode;
}

export const ResultCard: FC<Props> = ({ title, value, icon }) => (
  <View style={styles.container}>
    <View style={styles.infoView}>
      <Text style={[TEXT_VARIANTS.font12, styles.title]}>{title}</Text>
      <Text style={[TEXT_VARIANTS.font22Bold]}>{value}</Text>
    </View>
    {Boolean(icon) && icon}
  </View>
);
