import React from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { View, TouchableOpacity, Text } from 'react-native';
import { TEXT_VARIANTS } from 'config/theme';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';

import { styles } from './TabBar.styles';

interface Title {
  value: string;
  key: number;
}

interface Props {
  titles: Title[];
  sceneIndex: number;
  setSceneIndex: (key: number) => void;
  scenes: { [key: number]: JSX.Element };
  scenesAmount: number;
}

export const TabBar = ({
  titles,
  sceneIndex,
  scenesAmount,
  setSceneIndex,
}: Props) => {
  const tabViewContainerWidth = SCREEN_WIDTH - 24;
  const TAB_ITEM_WIDTH = tabViewContainerWidth / scenesAmount - 2;
  const TAB_WIDTH = tabViewContainerWidth / scenesAmount - 3;

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(sceneIndex * TAB_ITEM_WIDTH, { damping: 16 }) },
    ],
  }));

  return (
    <View>
      <View style={[styles.tabViewContainer, { width: tabViewContainerWidth }]}>
        {titles.map((title: Title, index: number) => (
          <TouchableOpacity
            style={styles.tabItem}
            key={index}
            onPress={() => setSceneIndex(title.key)}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[TEXT_VARIANTS.font14, styles.tabTitle]}
            >
              {title.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View
        style={[styles.indicator, animatedStyles, { width: TAB_WIDTH }]}
      />
    </View>
  );
};
