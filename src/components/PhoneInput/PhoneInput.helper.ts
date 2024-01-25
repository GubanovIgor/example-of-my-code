import { PhoneOption } from 'core/interfaces/phoneOption';
import { isRegExp } from 'lodash';
import { Mask } from 'react-native-mask-input';

export const MASK_SYMBOL = 'X';

export const getPhoneMaskValue = (
  phoneOption?: PhoneOption | null,
  length?: number,
): Mask => {
  if (phoneOption?.mask && !phoneOption?.multipleMasks) {
    return phoneOption?.convertedMask as Mask;
  }

  const maskArray =
    phoneOption?.convertedMask !== undefined
      ? (phoneOption?.convertedMask as Mask[])
      : [];

  const convertedMask = maskArray
    ?.sort()
    .find((item) => item.length >= Number(length));

  return convertedMask || maskArray[maskArray.length - 1];
};

export const convertPhoneNumberMaskToPlaceholder = (mask: Mask | undefined) => {
  let convertedMask = '';

  // @ts-ignore
  mask.forEach((el: string | RegExp) => {
    if (isRegExp(el)) {
      convertedMask = convertedMask + MASK_SYMBOL;
    } else {
      convertedMask = convertedMask + el;
    }
  });

  return convertedMask;
};
