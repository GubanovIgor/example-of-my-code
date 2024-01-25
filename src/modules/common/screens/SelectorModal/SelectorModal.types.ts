import { SectionListData } from 'react-native';

export type Item = SectionListData<string, SelectorModalSection>;

export interface SelectorModalSection {
  title: string;
  data: readonly Item[];
}

export interface Props {
  selectorOptions: Item[];
  onSearch: (value: string) => void;
  onClearSearch: () => void;
  handleSelectorItem: (value: string) => () => void;
}
