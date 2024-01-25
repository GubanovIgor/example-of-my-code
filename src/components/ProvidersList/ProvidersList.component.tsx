import React, { FC } from 'react';
import { TEXT_VARIANTS } from 'config/theme';
import { GetTranslationValue, VoidFunction } from 'core/interfaces';
import { ProvidersListItem_fragment$key } from 'queries/__generated__/ProvidersListItem_fragment.graphql';
import { useTranslation } from 'react-i18next';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { FragmentRefs } from 'relay-runtime';
import ArrowToRightIcon from 'assets/icons/arrowToRight.svg';
import { noop } from 'lodash';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';

import { styles } from './ProvidersList.styles';
import { ProvidersListItem } from './ProvidersListItem.component';

type ListType = 'horizontal' | 'verticalDefault' | 'verticalSearch';

interface ProvidersListProps {
  providers?:
    | readonly {
        readonly ' $fragmentSpreads': FragmentRefs<'ProvidersListItem_fragment'>;
      }[]
    | null;
  onPressSeeAll?: VoidFunction;
  hasHeader?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  customEmptyComponent?: JSX.Element | null;
  itemColor?: string;
  type?: 'horizontal' | 'verticalDefault' | 'verticalSearch';
}

const getItemRenderer =
  (type: ListType, itemColor?: string) =>
  ({ item }: { item: ProvidersListItem_fragment$key }) =>
    (
      <ProvidersListItem
        // itemStyles={
        //   type === 'verticalDefault' ? styles.verticalDefaultContainer : {}
        // }
        itemColor={itemColor}
        fullWidth={type === 'verticalSearch'}
        shouldScaleForColumn={type !== 'horizontal'}
        item={item}
      />
    );

const getHeaderRenderer = (
  onPressAll: VoidFunction,
  t: GetTranslationValue,
) => (
  <View style={styles.titleContainer}>
    <Text style={[TEXT_VARIANTS.font28]}>{t('PROVIDERS')}</Text>
    <TouchableOpacity
      onPress={onPressAll}
      style={styles.arrowToRightIconContainer}
    >
      <ArrowToRightIcon />
    </TouchableOpacity>
  </View>
);

const getSeparatorRenderer = (type: ListType) => () =>
  (
    <View
      style={
        styles[
          type === 'horizontal' ? 'separatorHorizontal' : 'separatorVertical'
        ]
      }
    />
  );

export const getContentContainerStyles = (
  type: ListType,
  insets: EdgeInsets,
) => {
  const paddingBottom = insets.bottom + insets.top;

  if (type === 'verticalSearch')
    return { ...styles.verticalSearchContainer, paddingBottom };

  if (type === 'horizontal') return styles.contentContainer;

  return {
    paddingBottom,
    ...styles.horizontalPadding,
  };
};

export const ProvidersList: FC<ProvidersListProps> = ({
  providers,
  onPressSeeAll = noop,
  hasHeader = true,
  itemColor,
  customEmptyComponent,
  containerStyles,
  type = 'verticalDefault',
}) => {
  const edgeInsets = useSafeAreaInsets();
  const { t } = useTranslation();

  const renderItem = getItemRenderer(type, itemColor);
  const renderSeparator = getSeparatorRenderer(type);
  const renderHeader = getHeaderRenderer(onPressSeeAll, t);

  return (
    <View
      style={[
        styles.container,
        containerStyles,
        type !== 'horizontal' && styles.verticalContainer,
      ]}
    >
      {hasHeader && renderHeader}
      <FlashList
        numColumns={type === 'verticalDefault' ? 2 : undefined}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={customEmptyComponent}
        horizontal={type === 'horizontal'}
        data={providers}
        renderItem={renderItem}
        contentContainerStyle={getContentContainerStyles(type, edgeInsets)}
        estimatedItemSize={200}
      />
    </View>
  );
};
