import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { computeAge } from 'core/utils';
import { GetTranslationValue } from 'core/interfaces';
import { PhoneOption } from 'core/interfaces/phoneOption';
import { formatWithMask, Mask } from 'react-native-mask-input';
import { getPhoneMaskValue } from 'components/PhoneInput/PhoneInput.helper';

export const getIsMultipleMaskPhoneValid = (mask: Mask[], phone: string) =>
  mask?.some((item) => item.length === phone.length);

export const getFormResolver = (
  phoneCountryValue: PhoneOption | null,
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
            const convertedMask = phoneCountryValue?.convertedMask;

            if (convertedMask?.length === 2) {
              return getIsMultipleMaskPhoneValid(
                convertedMask as Mask[],
                phone,
              );
            }

            return phone.length === phoneCountryValue?.convertedMask?.length;
          },
          () => ({
            message: `${t('SIGN_UP_SCHEMA.INVALID_PHONE')} ${
              phoneCountryValue?.country
            }`,
          }),
        ),
      currency: z.string().min(3, t('REQUIRED')),
      address: z.string().min(1, t('REQUIRED')),
      email: z
        .string()
        .min(1, t('REQUIRED'))
        .email(t('SIGN_UP_SCHEMA.INVALID_EMAIL')),
      name: z
        .string()
        .min(1, t('REQUIRED'))
        .regex(/^[a-zA-Z ]+$/, t('SIGN_UP_SCHEMA.FIRST_NAME_ONLY_LETTERS')),
      lastName: z
        .string()
        .min(1, t('REQUIRED'))
        .regex(/^[a-zA-Z ]+$/, t('SIGN_UP_SCHEMA.LAST_NAME_ONLY_LETTERS')),
      dob: z
        .string()
        .regex(
          /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
          t('SIGN_UP_SCHEMA.INVALID_DATE'),
        )
        .refine(
          (value) => computeAge(value) >= 18,
          t('SIGN_UP_SCHEMA.NOT_18_YEARS'),
        ),
      password: z
        .string()
        .min(8, t('LOGIN_SCHEMA.PASSWORD_MIN'))
        .regex(/[a-z]/, t('LOGIN_SCHEMA.PASSWORD_CONTAIN_ONE_LETTER'))
        .regex(/[0-9]/, t('LOGIN_SCHEMA.PASSWORD_CONTAIN_ONE_NUMBER')),
      terms: z.boolean().refine((v) => v, t('SIGN_UP_SCHEMA.AGREE')),
    }),
  );

export const formatPhoneNumberByMask = (
  phoneOption: PhoneOption,
  phoneValue: string,
) => {
  const { masked } = formatWithMask({
    text: phoneValue,
    mask: getPhoneMaskValue(phoneOption, phoneValue.length),
    obfuscationCharacter: '-',
  });

  return masked;
};
