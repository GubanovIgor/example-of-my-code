import { CustomPickerValue } from 'core/interfaces';
import { ViewStyle } from 'react-native';

export interface Props {
  onPressHandler: () => void;
  styleProps?: ViewStyle;
  placeholder?: string;
  placeholderStyleProp?: ViewStyle;
  name: string;
  chosenOption?: CustomPickerValue;
}
