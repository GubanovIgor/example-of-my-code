import React, { FC } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import FavoriteIcon from 'assets/icons/favorite.svg';
import FavoriteFillIcon from 'assets/icons/favoriteFill.svg';
import { Button } from 'components/Button';
import { RecommendedGamesList } from 'components/RecommendedGames/RecommendedGamesList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './GamePreview.styles';
import { GamePreviewPresenterProps } from './GamePreview.types';

export const GamePreviewPresenter: FC<GamePreviewPresenterProps> = ({
  handlePressGoToSession,
  handlePressLike,
  handlePressProvider,
  t,
  game,
  isLiked,
}) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.titleContainer}>
          <View>
            <Text style={[TEXT_VARIANTS.font20, styles.gameName]}>
              {game?.name}
            </Text>
            <Text
              onPress={handlePressProvider}
              style={[TEXT_VARIANTS.font16, styles.providerName]}
            >
              {game?.providerName}
            </Text>
          </View>
          <TouchableOpacity onPress={handlePressLike}>
            {isLiked ? (
              <FavoriteFillIcon width="28" height="28" />
            ) : (
              <FavoriteIcon fill={COLORS.TEXT_GRAY} width="28" height="28" />
            )}
          </TouchableOpacity>
        </View>
        <FastImage
          source={{ uri: game?.emphasedImageUrl, priority: 'high' }}
          resizeMode="stretch"
          style={styles.image}
        />
        <View style={styles.buttonsContainer}>
          {game?.hasDemoMode && (
            <Button
              text={t('DEMO')}
              onPress={handlePressGoToSession(true)}
              variant="outlined"
              textStyles={[TEXT_VARIANTS.font14, styles.btnText]}
              containerStyles={styles.defaultBtn}
            />
          )}
          <Button
            text={t('PLAY')}
            onPress={handlePressGoToSession()}
            containerStyles={[styles.defaultBtn, styles.buttonLeftMargin]}
          />
        </View>
      </View>
      <RecommendedGamesList containerStyles={{ paddingBottom: bottom }} />
    </ScrollView>
  );
};
