import React from 'react';
import { View, Text, Pressable } from 'react-native';
import tournamentBg from 'assets/images/tournaments/tournamentBg.png';
import tournament from 'assets/images/tournaments/tournament.png';
import FastImage from 'react-native-fast-image';
import { GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import { BonusTimer } from 'components/BonusTimer';
import { HomeStackParamList } from 'core/interfaces/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { PATHS } from 'constants/PATHS';

import { styles } from './TournamentsItem.styles';

export const TournamentsItem = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const openTournament = () => {
    navigation.navigate(PATHS.TOURNAMENT);
  };

  return (
    <Pressable style={styles.container} onPress={openTournament}>
      <FastImage
        resizeMode="contain"
        source={tournamentBg}
        style={styles.imageBg}
      />
      <FastImage
        resizeMode="contain"
        source={tournament}
        style={styles.image}
      />
      <View style={styles.infoSection}>
        <Text
          style={[TEXT_VARIANTS.font18Bold, { marginTop: GUTTER_SIZE * 4 }]}
        >
          Pragmatic play
        </Text>
        <Text style={[TEXT_VARIANTS.font18Bold]}>tournament</Text>
        <Text style={[TEXT_VARIANTS.font14, { marginTop: GUTTER_SIZE * 5 }]}>
          Prizing
        </Text>
        <Text style={[TEXT_VARIANTS.font32, { marginTop: GUTTER_SIZE }]}>
          3,000,000 CLP
        </Text>
        <Text
          style={[
            TEXT_VARIANTS.font14,
            { marginTop: GUTTER_SIZE * 5, marginBottom: GUTTER_SIZE * 2 },
          ]}
        >
          Expires in
        </Text>
        <BonusTimer />
      </View>
    </Pressable>
  );
};
