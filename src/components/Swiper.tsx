import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  StyleProp,
  Text,
  TextStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { swiperData } from 'assets/__mocks__/banners';
import FastImage, { Source } from 'react-native-fast-image';
import { useLocalisationStore } from 'store/localisationStore';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from 'core/interfaces/navigation';
import { useAuthStore } from 'store/authStore';

import { Button } from './Button';
import { SCREEN_WIDTH } from '../constants';

const CARD_LENGTH = SCREEN_WIDTH * 0.89;
const IMAGE_MARGIN = 5;
const SHEAR_LENGTH = CARD_LENGTH + IMAGE_MARGIN * 2;
const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<ISwiperItem>,
);

interface ISwiperItem {
  id: string;
  bg: {
    image: { [key: string]: number | Source };
    styles: any;
  };
  title?: {
    styles: StyleProp<TextStyle>;
    text: string;
  };
  button: {
    title: string;
    styles: StyleProp<TextStyle>;
    onPress: (
      navigation: StackNavigationProp<HomeStackParamList>,
      isLoggedIn?: boolean,
    ) => void;
  };
  text: {
    image: { [key: string]: number | Source };
    styles: any;
    text: string;
  };
}

interface ISwiperImageProps {
  index: number;
  scrollX: number;
  item: ISwiperItem;
}

const SwiperImage = ({ index, scrollX, item }: ISwiperImageProps) => {
  const size = useSharedValue(index === 0 ? 1 : 0.8);
  const { currentLanguage } = useLocalisationStore((s) => s);
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const { isLoggedIn } = useAuthStore((s) => ({
    isLoggedIn: Boolean(s.loginState.accessToken),
  }));

  const inputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.8, 1, 0.8],
    Extrapolate.CLAMP,
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: size.value }],
  }));

  return (
    <Animated.View style={[styles.card, cardStyle]}>
      <FastImage
        source={item.bg.image[currentLanguage.key]}
        style={item.bg.styles}
      />
      {item.title && (
        <Text style={item.title.styles}>{t(item.title.text)}</Text>
      )}
      {item.text && (
        <FastImage
          source={item.text.image[currentLanguage.key]}
          style={item.text.styles}
        />
      )}
      <Button
        containerStyles={item.button.styles}
        text={item.button.title}
        onPress={() => item.button.onPress(navigation, isLoggedIn)}
      />
    </Animated.View>
  );
};

const keyExtractor = (item: ISwiperItem) => item.id;

const getOnScroll =
  (setScrollX: (value: number) => void) =>
  (event: NativeSyntheticEvent<NativeScrollEvent>) =>
    setScrollX(event.nativeEvent.contentOffset.x);

const getSwiperItemRenderer =
  (scrollX: number) =>
  ({ item, index }: { item: ISwiperItem; index: number }) =>
    <SwiperImage item={item} index={index} scrollX={scrollX} />;

export const Swiper = () => {
  const [scrollX, setScrollX] = useState(0);
  const renderSwiperItem = getSwiperItemRenderer(scrollX);
  const onScroll = getOnScroll(setScrollX);

  return (
    <Animated.View style={styles.container}>
      <AnimatedFlatList
        // @ts-ignore
        data={swiperData}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={SHEAR_LENGTH}
        disableIntervalMomentum={true}
        snapToAlignment="center"
        horizontal={true}
        renderItem={renderSwiperItem}
        keyExtractor={keyExtractor}
        onScroll={onScroll}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  card: {
    width: CARD_LENGTH,
    height: 140,
    overflow: 'hidden',
    borderRadius: 8,
    marginHorizontal: IMAGE_MARGIN,
  },
});
