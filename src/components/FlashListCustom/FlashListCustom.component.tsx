import React from 'react';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import { COLORS } from 'config/theme';
import { VoidFunction } from 'core/interfaces';
import { noop } from 'lodash';
import { RefreshControl, ScrollView } from 'react-native';

import { styles } from './FlashListCustom.styles';

interface Props<T> extends Omit<FlashListProps<any>, 'data'> {
  data?: T[];
  isRefetching?: boolean;
  onRefresh?: VoidFunction;
  emptyComponent?: JSX.Element;
}

const getRefreshControl = (isRefetching: boolean, onRefresh?: VoidFunction) => (
  <RefreshControl
    tintColor={COLORS.ON_PRIMARY}
    refreshing={isRefetching}
    onRefresh={onRefresh}
  />
);

export const FlashListCustom = <T,>({
  data,
  emptyComponent,
  isRefetching = false,
  onRefresh = noop,
  ...props
}: Props<T>) => {
  const renderRefreshControl = getRefreshControl(isRefetching, onRefresh);

  return !data?.length && emptyComponent ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={renderRefreshControl}
    >
      {emptyComponent}
    </ScrollView>
  ) : (
    <FlashList {...props} data={data} refreshControl={renderRefreshControl} />
  );
};
