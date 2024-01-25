import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { styles } from './PaginationListFooter.styles';

interface PaginationListFooterProps {
  isLoading: boolean;
}

export const PaginationListFooter: FC<PaginationListFooterProps> = ({
  isLoading,
}) =>
  isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : null;
