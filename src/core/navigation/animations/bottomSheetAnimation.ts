import { StackCardInterpolationProps } from '@react-navigation/stack';
import { Animated } from 'react-native';

type Interpolation = {
  progress: Animated.AnimatedInterpolation<any>;
};

const getProgress = (current: Interpolation, next?: Interpolation) =>
  Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

export const bottomSheetAnimation = ({
  current,
  next,
  inverted,
  layouts: { screen },
}: StackCardInterpolationProps) => {
  const progress = getProgress(current, next);

  /**
   * opacity for cardOverlay form here it goes to cardOverlay in getBottomSheetScreenOptions as a props "style"
   * and then to to CardOverlay to animate background
   */
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    overlayStyle: {
      opacity,
    },
    cardStyle: {
      transform: [
        {
          translateY: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.height, // Focused, but offscreen in the beginning
                0, // Fully focused
                0, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};
