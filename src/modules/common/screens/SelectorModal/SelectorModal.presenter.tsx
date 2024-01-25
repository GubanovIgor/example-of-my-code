import React from 'react';
import { SectionList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FormProvider, useForm } from 'react-hook-form';

import { SearchInput } from '../Search/components';
import { styles } from './SelectorModal.styles';
import { SelectorModalSection, Props } from './SelectorModal.types';
import { SectionItem } from './components/SectionItem';
import { SectionTitle } from './components/SectionTitle';

const renderSectionTitle = ({ title, data }: SelectorModalSection) => (
  <SectionTitle title={title} data={data} />
);

const getSectionItemRenderer =
  (handleSelectorItem: (value: string) => () => void) =>
  ({ item }: { item: string }) =>
    <SectionItem handleSelectorItem={handleSelectorItem} item={item} />;

export const SelectorModalPresenter = ({
  selectorOptions,
  onSearch,
  onClearSearch,
  handleSelectorItem,
}: Props) => {
  const { bottom } = useSafeAreaInsets();
  const renderSectionItem = getSectionItemRenderer(handleSelectorItem);

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <SearchInput onSearch={onSearch} onClearSearch={onClearSearch} />
      <SectionList
        contentContainerStyle={{
          paddingBottom: bottom,
        }}
        style={styles.sectionList}
        sections={selectorOptions}
        renderItem={renderSectionItem}
        renderSectionHeader={({ section }) => renderSectionTitle(section)}
      />
    </FormProvider>
  );
};
