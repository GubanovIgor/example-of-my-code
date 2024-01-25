import { COLORS } from 'config/theme';
import React, { FC, useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';

const SPINNER_HEIGHT = 20;
const SPINNER_BORDER_WIDTH = 2;

interface Props {
  height?: number;
  backgroundColor?: string;
  borderWidth?: number;
  containerStyles?: StyleProp<ViewStyle>;
}

export const LoadingSpinner: FC<Props> = ({
  height = SPINNER_HEIGHT,
  backgroundColor = COLORS.PRIMARY,
  borderWidth = SPINNER_BORDER_WIDTH,
  containerStyles,
}): JSX.Element => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    }),
    [rotation.value],
  );

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      500,
    );
    return () => cancelAnimation(rotation);
  }, [rotation]);

  return (
    <View style={[styles.container, containerStyles]}>
      <Animated.View
        style={[
          styles.spinner,
          {
            borderWidth: borderWidth,
            height: height,
            width: height,
            borderRadius: height / 2,
            borderLeftColor: backgroundColor,
          },
          animatedStyles,
          {},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  spinner: {
    borderTopColor: COLORS.ON_PRIMARY,
    borderRightColor: COLORS.ON_PRIMARY,
    borderBottomColor: COLORS.ON_PRIMARY,
  },
});
