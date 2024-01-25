import React, { FC } from 'react';
import { TEXT_VARIANTS } from 'config/theme';
import {
  IRandomWin,
  useGetRandomWinningItems,
} from 'modules/home/hooks/useGetRandomWinningItems';
import { WinningNow_fragment$key } from 'queries/__generated__/WinningNow_fragment.graphql';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { graphql, useFragment } from 'react-relay';

import { styles } from './WinningNow.styles';
import { WinningNowItem } from './WinningNowItem.component';

const fragment = graphql`
  fragment WinningNow_fragment on Query {
    popWin: gamesByFilter(skip: 0, take: 10, tags: [POP]) {
      items {
        name
        emphasedImageUrl
      }
    }
    topWin: gamesByFilter(skip: 0, take: 10, tags: [TOP]) {
      items {
        name
        emphasedImageUrl
      }
    }
    hotWin: gamesByFilter(skip: 0, take: 10, tags: [HOT]) {
      items {
        name
        emphasedImageUrl
      }
    }
    newWin: gamesByFilter(skip: 0, take: 10, tags: [NEW]) {
      items {
        name
        emphasedImageUrl
      }
    }
  }
`;

const renderItem = (item: IRandomWin, index: number) => (
  <WinningNowItem info={item} key={`${item.userName}${index}`} />
);

interface Props {
  fragmentRef: WinningNow_fragment$key;
}

export const WinningNow: FC<Props> = ({ fragmentRef }) => {
  const { t } = useTranslation();

  const data = useFragment(fragment, fragmentRef);
  const { randomWins } = useGetRandomWinningItems(data);

  if (!randomWins.length) return null;

  return (
    <View style={styles.container}>
      <Text style={[TEXT_VARIANTS.font28, styles.title]}>
        {t('WINNING_NOW')}
      </Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {randomWins?.map(renderItem)}
      </ScrollView>
    </View>
  );
};
