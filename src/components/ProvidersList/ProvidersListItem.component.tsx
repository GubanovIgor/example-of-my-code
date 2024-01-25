import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { ProvidersListItem_fragment$key } from 'queries/__generated__/ProvidersListItem_fragment.graphql';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { graphql, useFragment } from 'react-relay';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';
import FastImage from 'react-native-fast-image';
import { COLORS, TEXT_VARIANTS } from 'config/theme';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';
import { PATHS } from 'constants/PATHS';

import { styles } from './ProvidersList.styles';

interface ProvidersListItemProps {
  item: ProvidersListItem_fragment$key;
  fullWidth?: boolean;
  itemColor?: string;
  itemStyles?: StyleProp<ViewStyle>;
  shouldScaleForColumn: boolean;
}

export const ProvidersListItemFragment = graphql`
  fragment ProvidersListItem_fragment on GameProvider {
    id
    name
    imageUrl
  }
`;

export const getContainerStyles = (
  shouldScaleForColumn: boolean,
  fullWidth?: boolean,
) => {
  if (fullWidth)
    return { width: CONTAINER_FULL_WIDTH, height: CONTAINER_HEIGT_WIDTH };
  return {
    width: shouldScaleForColumn
      ? CONTAINER_SCALED_WIDTH
      : CONTAINER_DEFAULT_WIDTH,
    height: shouldScaleForColumn
      ? CONTAINER_SCALED_HEIGHT
      : CONTAINER_DEFAULT_HEIGHT,
  };
};

const CONTAINER_SCALED_WIDTH = SCREEN_WIDTH / 2 - 20;
const CONTAINER_SCALED_HEIGHT = CONTAINER_SCALED_WIDTH / 2.8;
const CONTAINER_DEFAULT_WIDTH = SCREEN_WIDTH / 3 - 16;
const CONTAINER_DEFAULT_HEIGHT = CONTAINER_DEFAULT_WIDTH / 2;
const CONTAINER_FULL_WIDTH = SCREEN_WIDTH - 24;
const CONTAINER_HEIGT_WIDTH = CONTAINER_FULL_WIDTH / 5.5;

export const ProvidersListItem: FC<ProvidersListItemProps> = memo(
  ({
    item,
    fullWidth = false,
    shouldScaleForColumn,
    itemStyles,
    itemColor = COLORS.LIGHT_BACKGROUND,
  }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [isImgLoadError, setIsImgLoadError] = useState(false);

    const { imageUrl, name } =
      useFragment(ProvidersListItemFragment, item) || {};

    const containerStyles: StyleProp<ViewStyle> = useMemo(
      () => [getContainerStyles(shouldScaleForColumn, fullWidth), itemStyles],
      [fullWidth, shouldScaleForColumn, itemStyles],
    );

    const onPress = useCallback(() => {
      if (!name) return;

      navigation.push(PATHS.PROVIDER, { providerName: name });
    }, [name, navigation]);

    const onError = () => {
      setIsImgLoadError(true);
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.itemContainer,
          { backgroundColor: itemColor },
          containerStyles,
        ]}
      >
        <FastImage
          onError={onError}
          source={{ uri: imageUrl }}
          style={isImgLoadError ? styles.imageNotLoaded : styles.image}
        />
        {isImgLoadError && (
          <Text style={[TEXT_VARIANTS.font14Bold, styles.providerName]}>
            {name}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);
