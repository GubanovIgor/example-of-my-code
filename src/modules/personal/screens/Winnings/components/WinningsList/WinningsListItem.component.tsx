import { TEXT_VARIANTS } from 'config/theme';
import { formatDate } from 'core/utils';
import { WinningsListItem_fragment$key } from 'queries/__generated__/WinningsListItem_fragment.graphql';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { graphql, useFragment } from 'react-relay';

import { styles } from './WinningsList.styles';

interface Props {
  fragmentRef: WinningsListItem_fragment$key;
}

const Fragment = graphql`
  fragment WinningsListItem_fragment on GamingHistory {
    amount
    reportAmount
    playType
    currencyId
    currencyName
    gameId
    gameName
    frontImageId
    previewImageId
    competitionProducerId
    producerName
    changedDate
    changedBy
    createdDate
    createdBy
    branchId
    userId
    currencySymbol
  }
`;

export const WinningsListItem: FC<Props> = ({ fragmentRef }) => {
  const {
    gameName,
    producerName,
    amount,
    previewImageId,
    createdDate,
    currencyName,
  } = useFragment(Fragment, fragmentRef);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <FastImage
          source={{ uri: previewImageId || '' }}
          resizeMode="stretch"
          style={styles.image}
        />
        <View style={styles.gameInfo}>
          <Text style={[TEXT_VARIANTS.font12Bold, styles.gameName]}>
            {gameName}
          </Text>
          <Text style={[TEXT_VARIANTS.font10, styles.gameProvider]}>
            {producerName}
          </Text>
        </View>
      </View>
      <View style={styles.winningInfo}>
        <Text style={[TEXT_VARIANTS.font12Bold, styles.winningAmount]}>
          {`+${amount} ${currencyName}`}
        </Text>
        <Text style={[TEXT_VARIANTS.font10Bold, styles.winningDate]}>
          {formatDate(createdDate)}
        </Text>
      </View>
    </View>
  );
};
