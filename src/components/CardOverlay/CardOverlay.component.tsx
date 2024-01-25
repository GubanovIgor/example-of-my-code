import React, { FC } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

import { styles } from './CardOverlay.styles';

interface Props {
  style: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
}
export const CardOverlay: FC<Props> = ({ style }) => (
  <Animated.View style={[styles.overlay, style]} />
);
