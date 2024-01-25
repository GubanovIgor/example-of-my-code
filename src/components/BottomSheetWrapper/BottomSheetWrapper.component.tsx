import { useNavigation } from '@react-navigation/native';
import { COLORS, GUTTER_SIZE } from 'config/theme';
import React, { FC, ReactNode, useCallback, useMemo, useRef } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUtilsStore } from 'store/utilsStore';
import { shallow } from 'zustand/shallow';
import LinearGradient from 'react-native-linear-gradient';
import { ImageSubHeader } from 'components/ImageSubHeader';

import { HEADER_HEIGHT } from 'constants/DIMENSIONS';

import { DragTopToBottomLine } from '../DragTopToBottomLine';
import { SubHeader } from '../SubHeader';
import { styles } from './BottomSheetWrapper.styles';

interface BottomSheetWrapperProps {
  title?: string | null;
  isBackButton?: boolean;
  closeOnOverlayTap?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  adjustToContentHeight?: boolean;
  shouldHaveHeader?: boolean;
  shouldHaveDraggableLine?: boolean;
  children: ReactNode;
  screenKey: string;
  isFirstDeposit?: boolean;
}

export const BottomSheetWrapper: FC<BottomSheetWrapperProps> = ({
  title,
  isBackButton,
  children,
  closeOnOverlayTap = true,
  shouldHaveHeader = true,
  shouldHaveDraggableLine = true,
  adjustToContentHeight,
  containerStyles,
  screenKey,
  isFirstDeposit = false,
}) => {
  const navigation = useNavigation();
  const isHeightSetRef = useRef(false);

  const { top } = useSafeAreaInsets();

  const { setGestureDistances } = useUtilsStore(
    (state) => ({
      setGestureDistances: state.setScreenGestureResponseDistance,
    }),
    shallow,
  );

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (isHeightSetRef.current) return;
      isHeightSetRef.current = true;
      const { height } = e.nativeEvent.layout || {};
      setGestureDistances(screenKey, height);
    },
    [screenKey, setGestureDistances],
  );

  const mainContainerStyle = useMemo(() => {
    if (adjustToContentHeight || containerStyles)
      return [styles.container, containerStyles];

    return [
      styles.container,
      {
        top: top + HEADER_HEIGHT + GUTTER_SIZE * 2,
      },
    ];
  }, [adjustToContentHeight, containerStyles, top]);

  const handlePressOnOverlay = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <Pressable
        disabled={!closeOnOverlayTap}
        onPress={handlePressOnOverlay}
        style={styles.flex}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.3 }}
        colors={
          isFirstDeposit
            ? [
                COLORS.FIRST_DEPOSIT_START_GRADIENT_BG,
                COLORS.FIRST_DEPOSIT_END_GRADIENT_BG,
              ]
            : [COLORS.DARK4, COLORS.DARK4]
        }
        onLayout={onLayout}
        style={[styles.container, mainContainerStyle]}
      >
        {shouldHaveDraggableLine && <DragTopToBottomLine />}
        {isFirstDeposit && <ImageSubHeader />}
        {shouldHaveHeader && (
          <SubHeader
            shouldUseInsets={false}
            title={title}
            isBackButton={isBackButton}
          />
        )}
        {children}
      </LinearGradient>
    </>
  );
};
