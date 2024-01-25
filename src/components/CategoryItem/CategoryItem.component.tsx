import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import { HomeStackParamList } from 'core/interfaces/navigation';
import { GameTags } from 'queries/__generated__/CategoryScreenFilteredGamesQuery.graphql';
import { CustomImage } from 'components/CustomImage';

import { PATHS } from 'constants/PATHS';

import { styles } from './CategoryItem.styles';
import { aviatorData } from './CategoryItem.helpers';

export type ICategoryData = {
  name: string;
  id?: string;
  imageUrl: string;
  tag?: GameTags | null;
  subCategories?: readonly ({
    readonly id: string;
    readonly name: string | null;
  } | null)[];
};

export const CategoryItem = ({
  categoryData,
}: {
  categoryData: ICategoryData;
}) => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const { imageUrl, name, subCategories, tag } = categoryData;
  const isAviator = name === 'Aviator';

  const handleNavigation = () => {
    if (name === 'Favorite') {
      navigation.navigate(PATHS.MY_GAMES);
      return;
    }

    if (name === 'Aviator') {
      navigation.navigate(PATHS.GAME_PREVIEW, {
        game: aviatorData,
      });
      return;
    }

    navigation.navigate(PATHS.CATEGORY, {
      categoryData: {
        title: name,
        subCategories: subCategories,
        tag,
      },
    });
  };

  return (
    <Pressable style={[styles.gameItemContainer]} onPress={handleNavigation}>
      <View
        style={[
          styles.halfCircle,
          isAviator && { backgroundColor: COLORS.AVIATOR_BACKGROUND },
        ]}
      >
        <CustomImage
          shouldReplacePng
          color={isAviator ? COLORS.WHITE : COLORS.PRIMARY}
          width="100%"
          height="100%"
          url={imageUrl}
        />
      </View>
      <View
        style={[
          styles.squareBox,
          isAviator && { backgroundColor: COLORS.AVIATOR_BACKGROUND },
        ]}
      >
        <View style={styles.gameTitleContainer}>
          <Text
            numberOfLines={2}
            style={[TEXT_VARIANTS.font16, styles.gameTitle]}
          >
            {name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
