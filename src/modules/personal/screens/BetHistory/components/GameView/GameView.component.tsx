import { useNavigation } from '@react-navigation/native';
import { Button } from 'components/Button';
import { TEXT_VARIANTS } from 'config/theme';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'core/interfaces/navigation';

import { PATHS } from 'constants/PATHS';

import { styles } from './GameView.styles';

interface Props {
  game?: {
    hasDemoMode?: boolean;
    id?: string;
    name: string | null;
    providerName: string | null;
    image: string | null;
  };
}

export const GameView: FC<Props> = ({ game }) => {
  const { image, name, providerName, hasDemoMode } = game || {};
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();

  const handlePressGame = useCallback(
    (isRealPlay?: boolean) => () => {
      navigation.navigate(PATHS.GAME_SESSION, {
        //@ts-ignore
        game,
        isPaidMode: Boolean(isRealPlay),
      });
    },
    [game, navigation],
  );

  return (
    <View style={styles.container}>
      <FastImage
        resizeMode="stretch"
        source={{ uri: image || '' }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={TEXT_VARIANTS.font14}>{name}</Text>
        <Text style={[TEXT_VARIANTS.font12, styles.providerName]}>
          {providerName}
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            text={t('PLAY')}
            onPress={handlePressGame(true)}
            containerStyles={[styles.button, styles.buttonMargin]}
          />
          {hasDemoMode && (
            <Button
              text={t('DEMO')}
              onPress={handlePressGame()}
              variant="outlined"
              textStyles={[TEXT_VARIANTS.font14, styles.btnText]}
              containerStyles={styles.button}
            />
          )}
        </View>
      </View>
    </View>
  );
};
