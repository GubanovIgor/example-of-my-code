import React from 'react';
import { View, Text } from 'react-native';
import { GUTTER_SIZE, TEXT_VARIANTS } from 'config/theme';
import PeopleIcon from 'assets/icons/people.svg';
import { useTranslation } from 'react-i18next';

import { styles } from './LeaderBoard.styles';
import { LeaderBoardHeader } from './subComponents/LeaderBoardHeader';
import { LeaderBoardItem } from './subComponents/LeaderBoardItem';
import { leaderBoardData } from './LeaderBoard.constants';

const getRenderLeaderBoardItem = () => (item, index) =>
  <LeaderBoardItem key={index} data={item} />;

export const LeaderBoard = () => {
  const renderLeaderBoardItem = getRenderLeaderBoardItem();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={[TEXT_VARIANTS.font14Bold, styles.title]}>
          {t('LEADERBOARD.TITLE')}
        </Text>
        <View style={styles.playersAmountWrapper}>
          <PeopleIcon />
          <Text
            style={[
              TEXT_VARIANTS.font14Bold,
              styles.title,
              { marginLeft: GUTTER_SIZE },
            ]}
          >
            156832
          </Text>
        </View>
      </View>
      <LeaderBoardHeader />
      {leaderBoardData.map(renderLeaderBoardItem)}
    </View>
  );
};
