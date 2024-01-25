export interface Props {
  handleSelectorItem: (value: string) => () => void;
  item: string;
}
