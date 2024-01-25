import { FlashList } from '@shopify/flash-list';
import { BonusItem } from 'components/BonusItem';
import { LazyLoadQueryOptions } from 'core/interfaces';
import { t } from 'i18next';
import { BonusItemListQuery } from 'queries/__generated__/BonusItemListQuery.graphql';
import { BonusItemList_fragment$key } from 'queries/__generated__/BonusItemList_fragment.graphql';
import { BonusItem_fragment$key } from 'queries/__generated__/BonusItem_fragment.graphql';
import React from 'react';
import { View } from 'react-native';
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay';

import { NoDataView } from '../NoDataView';
import { styles } from './BonusItemList.styles';
import { filterBonuses } from './BonusItemList.utils';

interface Props {
  isActive: boolean;
  queryOptions?: LazyLoadQueryOptions;
}

const Fragment = graphql`
  fragment BonusItemList_fragment on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 20 }
    after: { type: "String" }
  )
  @refetchable(queryName: "bonusesConnectionQuery") {
    bonusesCursor(first: $first, after: $after)
      @connection(key: "BonusItemList_bonusesCursor") {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          active
          ...BonusItem_fragment
        }
      }
      totalCount
    }
  }
`;

const query = graphql`
  query BonusItemListQuery {
    ...BonusItemList_fragment
  }
`;

//@ts-ignore
const keyExtractor = (_, index) => index.toString();

const renderBonusItem = ({
  item,
}: {
  item: {
    readonly cursor: string;
    readonly node: BonusItem_fragment$key;
  };
}) => <BonusItem bonusItemFragmentRef={item.node} />;

export const BonusItemList = ({ isActive, queryOptions }: Props) => {
  const bonusesData = useLazyLoadQuery<BonusItemListQuery>(
    query,
    {},
    queryOptions,
  );

  const { data } = usePaginationFragment<
    BonusItemListQuery,
    BonusItemList_fragment$key
  >(Fragment, bonusesData);

  // We dont have possibility to get only active or archive bonuses from the server
  // Thats why we filter them here
  const bonuses = filterBonuses(isActive, data);

  if (!bonuses.length) {
    return (
      <NoDataView
        title={t('NO_BONUSES_TITLE').toString()}
        description={t('NO_BONUSES_DESC').toString()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        renderItem={renderBonusItem}
        data={bonuses}
        keyExtractor={keyExtractor}
        estimatedItemSize={200}
      />
    </View>
  );
};
