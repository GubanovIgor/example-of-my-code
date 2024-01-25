import React, { FC, memo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { COLORS, TEXT_VARIANTS } from 'config/theme';
import ArrowToBottomIcon from 'assets/icons/arrowToBottom.svg';
import { graphql, useFragment } from 'react-relay';
import {
  BetHistoryListItem_fragment$data,
  BetHistoryListItem_fragment$key,
  PlayType,
} from 'queries/__generated__/BetHistoryListItem_fragment.graphql';
import { GetTranslationValue } from 'core/interfaces';
import { formatDate } from 'core/utils';

import { GameView } from '../GameView';
import { styles } from './BetHistoryList.styles';

const BetHistoryListItemFragment = graphql`
  fragment BetHistoryListItem_fragment on GamingHistory {
    id
    amount
    reportAmount
    playType
    currencyId
    hasDemoMode
    currencyName
    gameId
    gameName
    frontImageId
    previewImageId
    internalId
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

const getPlayTypeText = (t: GetTranslationValue, playType: PlayType) => {
  if (playType !== 'BET' && playType !== 'WIN') return '';

  return playType === 'BET' ? t('STACK') : t('PAYOUT');
};

const getAmoutWithCurrency = (item: BetHistoryListItem_fragment$data) =>
  `${item.currencyName}${
    item.currencySymbol ? ` ${item.currencySymbol}` : ''
  } ${item.amount}`;

interface Props {
  betHistoryRef: BetHistoryListItem_fragment$key;
}

export const BetHistoryItem: FC<Props> = memo(({ betHistoryRef }) => {
  const item = useFragment(BetHistoryListItemFragment, betHistoryRef);

  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(false);

  const onPressExpand = () => {
    setIsExpanded((prevValue) => !prevValue);
  };

  const playTypeText = getPlayTypeText(t, item.playType);
  const amountWithCurrency = getAmoutWithCurrency(item);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPressExpand}
      style={styles.itemContainer}
    >
      <View style={[styles.row, styles.topView]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[TEXT_VARIANTS.font12]}
        >{`№${item.internalId}`}</Text>
        <View style={styles.rowNoSpace}>
          <Text style={[TEXT_VARIANTS.font12, styles.date]}>
            {formatDate(item.createdDate, 'DD.MM.YYYY HH:MM')}
          </Text>
          <ArrowToBottomIcon fill={COLORS.TEXT_LIGHT} />
        </View>
      </View>
      {isExpanded && (
        <View style={styles.gameDetials}>
          <GameView
            game={{
              id: item.gameId,
              hasDemoMode: item?.hasDemoMode,
              providerName: item?.producerName,
              image: item?.previewImageId,
              name: item.gameName,
            }}
          />
        </View>
      )}
      <View style={styles.row}>
        <Text style={[TEXT_VARIANTS.font16Bold, styles.payout]}>
          {playTypeText}
        </Text>
        <Text style={[TEXT_VARIANTS.font16Bold, styles.payout]}>
          {amountWithCurrency}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
