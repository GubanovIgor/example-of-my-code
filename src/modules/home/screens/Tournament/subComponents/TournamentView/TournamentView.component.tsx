import React from 'react';
import { View, Text } from 'react-native';
import tournamentBg from 'assets/images/tournaments/tournamentBg.png';
import tournament from 'assets/images/tournaments/tournament.png';
import FastImage from 'react-native-fast-image';
import { GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import { BonusTimer } from 'components/BonusTimer';
import { Button } from 'components/Button';
import { useAuthStore } from 'store/authStore';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'core/interfaces/navigation';
import { StackNavigationProp } from '@react-navigation/stack';

import { SCREEN_WIDTH } from 'constants/DIMENSIONS';
import { PATHS } from 'constants/PATHS';

import { styles } from './TournamentView.styles';

export const TournamentView = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isAuth } = useAuthStore((s) => ({
    isAuth: Boolean(s.loginState.accessToken),
  }));

  const handlePressTournament = () => {
    navigation.navigate(PATHS.SIGN_IN);
  };

  return (
    <View style={styles.container}>
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
          style={[TEXT_VARIANTS.font24Bold, { marginTop: GUTTER_SIZE * 4 }]}
        >
          Pragmatic play tournament
        </Text>
        <View style={styles.infoWrapper}>
          <View>
            <Text
              style={[TEXT_VARIANTS.font14, { marginTop: GUTTER_SIZE * 5 }]}
            >
              Prizing
            </Text>
            <Text
              style={[TEXT_VARIANTS.font20Bold, { marginTop: GUTTER_SIZE }]}
            >
              3,000,000 CLP
            </Text>
          </View>
          <View>
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
        </View>
        <Button
          onPress={handlePressTournament}
          text={isAuth ? 'OPT IN' : 'LOG IN'}
          containerStyles={{
            marginTop: GUTTER_SIZE * 4,
            width: SCREEN_WIDTH - GUTTER_SIZE * 10,
          }}
        />
      </View>
    </View>
  );
};
