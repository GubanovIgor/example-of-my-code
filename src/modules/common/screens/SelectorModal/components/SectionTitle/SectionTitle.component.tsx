import { TEXT_VARIANTS } from 'config/theme';
import React from 'react';
import { Text, View } from 'react-native';

import { SelectorModalSection } from '../../SelectorModal.types';
import { styles } from './SectionTitle.styles';

export const SectionTitle = ({ title, data }: SelectorModalSection) => {
  if (!data.length) return <></>;

  return (
    <View style={styles.sectionTitleContainer}>
      <Text style={[TEXT_VARIANTS.font16, styles.sectionTitle]}>{title}</Text>
    </View>
  );
};
