import { Mask } from 'react-native-mask-input';

export interface PhoneOption {
  id: number;
  country: string;
  code: string;
  icon: JSX.Element;
  mask: string | string[];
  iso: string;
  convertedMask?: Mask | Mask[] | undefined;
  multipleMasks?: boolean;
  phoneMaskPlaceholder?: string;
}
