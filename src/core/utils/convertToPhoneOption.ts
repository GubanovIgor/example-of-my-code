import { Mask } from 'react-native-mask-input';

const getMaskFormat = (symbol: string) => (symbol === '9' ? /\d/ : symbol);

export const convertToPhoneOption = (
  stringMask: string | string[],
): { mask: Mask | Mask[]; multipleMasks?: boolean } => {
  if (typeof stringMask === 'string') {
    const result = stringMask.split('').map(getMaskFormat);

    return { mask: result as Mask };
  }

  const result = stringMask.map((s: string) => s.split('').map(getMaskFormat));

  return { mask: result as Mask[], multipleMasks: true };
};
