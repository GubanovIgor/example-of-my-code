import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PhoneOption } from 'core/interfaces/phoneOption';
import { GetTranslationValue } from 'core/interfaces';
import { isArray } from 'lodash';

export const getFormResolver = (
  phoneCountryValue: PhoneOption | undefined,
  t: GetTranslationValue,
) =>
  zodResolver(
    z.object({
      phone: z
        .string()
        .min(3, t('REQUIRED'))
        .refine(
          (v) => {
            const phone = v.replaceAll('X', '');
            return isMaskCorrect(phone, phoneCountryValue?.mask);
          },
          () => ({
            message: `${t('SIGN_UP_SCHEMA.INVALID_PHONE')} ${
              phoneCountryValue?.country
            }`,
          }),
        ),
    }),
  );

const isMaskCorrect = (phone: string, mask?: string | string[]) => {
  if (isArray(mask)) {
    let res = false;
    mask.forEach((el) => {
      if (el.length === phone.length) {
        res = true;
      }
    });

    return res;
  }

  return phone.length === mask?.length;
};
