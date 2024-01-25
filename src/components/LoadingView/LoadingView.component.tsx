import React, { FC } from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';

import { styles } from './LoadingView.styles';

interface Props {
  containerStyles?: StyleProp<ViewStyle>;
}

export const LoadingView: FC<Props> = ({ containerStyles }) => (
  <View style={[styles.container, containerStyles]}>
    <ActivityIndicator />
  </View>
);
